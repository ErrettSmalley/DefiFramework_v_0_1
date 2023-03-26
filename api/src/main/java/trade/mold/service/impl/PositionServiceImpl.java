package trade.mold.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.utils.Numeric;
import trade.mold.client.Web3jClient;
import trade.mold.dao.AccountProfitDao;
import trade.mold.dao.ConfigDao;
import trade.mold.dao.ExecutionLogDao;
import trade.mold.dao.PositionDao;
import trade.mold.dto.PositionStruct;
import trade.mold.entity.AccountProfit;
import trade.mold.entity.Config;
import trade.mold.entity.ExecutionLog;
import trade.mold.entity.Position;
import trade.mold.service.PositionService;
import trade.mold.service.ReaderService;
import trade.mold.utils.Constants;
import trade.mold.utils.Events;
import trade.mold.utils.MoldUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class PositionServiceImpl implements PositionService {

    @Resource
    private PositionDao positionDao;

    @Resource
    private Web3jClient web3jClient;

    @Resource
    private ConfigDao configDao;

    @Resource
    private ExecutionLogDao executionLogDao;

    @Resource
    private ReaderService readerService;

    @Resource
    private AccountProfitDao accountProfitDao;

    @Transactional
    public void increasePosition(Log lg, long timestamp, long chain) {
        List<Type> data = FunctionReturnDecoder.decode(lg.getData(), Events.IncreasePosition.getNonIndexedParameters());

        BigDecimal increaseVolume = MoldUtils.toUsdDecimal(data.get(5).getValue());
        if (increaseVolume.compareTo(BigDecimal.ZERO) > 0) {
            Config volume = configDao.getByChainAndName(chain, "total_volume");
            BigDecimal newVolume = new BigDecimal(volume.getValue()).add(increaseVolume);
            volume.setValue(newVolume.toString());
            configDao.saveAndFlush(volume);
        }

        Bytes32 keyBytes = (Bytes32) data.get(0);
        String key = Numeric.toHexString(keyBytes.getValue()).toLowerCase();
        int exist = positionDao.countPositionById(key);
        if (exist > 0)
            return;

        Position position = new Position();
        position.setId(key);
        position.setAccount(data.get(1).toString().toLowerCase());
        position.setCollateralToken(data.get(2).toString().toLowerCase());
        position.setIndexToken(data.get(3).toString().toLowerCase());
        position.setLong((Boolean) data.get(6).getValue());
        position.setCreateTimestamp(timestamp);
        position.setChain(chain);
        positionDao.saveAndFlush(position);
    }

    @Transactional
    public void updatePosition(Log lg, long timestamp) {
        List<Type> data = FunctionReturnDecoder.decode(lg.getData(), Events.UpdatePosition.getNonIndexedParameters());
        Bytes32 keyBytes = (Bytes32) data.get(0);
        String key = Numeric.toHexString(keyBytes.getValue()).toLowerCase();

        Position position = positionDao.getById(key);
        position.setSize(MoldUtils.toUsdDecimal(data.get(1).getValue()));
        position.setCollateral(MoldUtils.toUsdDecimal(data.get(2).getValue()));
        position.setAveragePrice(MoldUtils.toUsdDecimal(data.get(3).getValue()));
        position.setEntryFundingRate(MoldUtils.toFundingRateDecimal(data.get(4).getValue()));
        position.setUpdateTimestamp(timestamp);
        position.setStatus(Constants.positionOpen);

        try {
            // update liq price
            BigDecimal liqPrice = getLiqPrice(position);
            if (BigDecimal.ZERO.compareTo(liqPrice) != 0)
                position.setLiqPrice(liqPrice);
        } catch (Exception e) {
            log.error("PositionService: getLiqPrice error", e);
        }
        positionDao.saveAndFlush(position);
    }

    @Transactional
    public void liquidatePosition(Position position, int robotIndex) {
        try {
            Credentials credentials = web3jClient.getCredentials(robotIndex);
            String robotAddress = credentials.getAddress();
            BigInteger nonce = web3jClient.getNonce(robotAddress);

            String vault = configDao.getByChainAndName(position.getChain(), "position_manager_contract").getValue();

            Function function = new Function("liquidatePosition", Arrays.asList(new Address(position.getAccount()), new Address(position.getCollateralToken()),
                    new Address(position.getIndexToken()), new Bool(position.isLong()), new Address(robotAddress)), Collections.emptyList());
            String encodedFunction = FunctionEncoder.encode(function);

            RawTransaction tx = RawTransaction.createTransaction(nonce, web3jClient.gasPrice(),
                    BigInteger.valueOf(1_500_000), vault, new BigInteger("0"), encodedFunction);

            String hash = web3jClient.sendContractFunction(tx, position.getChain(), credentials);

            ExecutionLog exLog = new ExecutionLog();
            exLog.setHash(hash.toLowerCase());
            exLog.setExecutor(robotAddress);
            exLog.setTimestamp(System.currentTimeMillis() / 1000);
            exLog.setRelId(position.getId());
            exLog.setStatus(Constants.executionWaiting);
            exLog.setChain(position.getChain());
            executionLogDao.saveAndFlush(exLog);

        } catch (Exception e) {
            log.error("### PositionService liquidatePosition error:", e);
        }
    }

    @Override
    public void closePosition(Log lg, long timestamp) {
        try {
            List<Type> data = FunctionReturnDecoder.decode(lg.getData(), Events.ClosePosition.getNonIndexedParameters());
            Bytes32 keyBytes = (Bytes32) data.get(0);
            String key = Numeric.toHexString(keyBytes.getValue()).toLowerCase();
            Position position = resetPosition(key, timestamp);

            // update account profit
            BigDecimal realisedPnl = MoldUtils.toUsdDecimal(data.get(6).getValue());
            updateAccountProfit(position.getChain(), position.getAccount(), realisedPnl);
        } catch (Exception e) {
            log.error("### PositionService closePosition error:", e);
        }
    }

    @Override
    public void liquidatePosition(long chain, Log lg, long timestamp) {
        try {
            List<Type> data = FunctionReturnDecoder.decode(lg.getData(), Events.LiquidatePosition.getNonIndexedParameters());
            Bytes32 keyBytes = (Bytes32) data.get(0);
            String key = Numeric.toHexString(keyBytes.getValue()).toLowerCase();
            Position position = resetPosition(key, timestamp);

            // update account profit
            BigDecimal collateral = MoldUtils.toUsdDecimal(data.get(6).getValue());
            updateAccountProfit(position.getChain(), position.getAccount(), collateral);
        } catch (Exception e) {
            log.error("### PositionService liquidatePosition error:", e);
        }
    }

    public void updateAccountProfit(long chain, String account, BigDecimal pnl) {
        try {
            AccountProfit profit = accountProfitDao.getByChainAndAccount(chain, account);
            if (profit == null) {
                profit = new AccountProfit();
                profit.setAccount(account);
                profit.setChain(chain);
                profit.setProfit(pnl);
            } else {
                profit.setProfit(profit.getProfit().add(pnl));
            }
            accountProfitDao.saveAndFlush(profit);
        } catch (Exception e) {
            log.error("### PositionService updateAccountProfit error:", e);
        }
    }

    @Override
    public Position resetPosition(String key, long timestamp) {
        Position position = positionDao.getById(key);
        position.setStatus(Constants.positionClosed);
        position.setSize(BigDecimal.ZERO);
        position.setCollateral(BigDecimal.ZERO);
        position.setAveragePrice(BigDecimal.ZERO);
        position.setEntryFundingRate(BigDecimal.ZERO);
        position.setLiqPrice(BigDecimal.ZERO);
        position.setUpdateTimestamp(timestamp);
        positionDao.save(position);
        return position;
    }

    @Override
    public void updatePositions(long chain, List<String> keys) {
        try {
            String vault = configDao.getByChainAndName(chain, "vault_contract").getValue();
            List<Position> positions = positionDao.getPositionsByIdIn(keys);

            for (Position position : positions) {
                Function function = new Function("positions", Collections.singletonList(new Bytes32(Numeric.hexStringToByteArray(position.getId()))),
                        Collections.singletonList(new TypeReference<PositionStruct>() {
                        }));
                List<Type> res = web3jClient.viewContractFunction(function, vault, Constants.zeroAddress);
                if (!CollectionUtils.isEmpty(res)) {
                    PositionStruct p = (PositionStruct) res.get(0);
                    position.setSize(MoldUtils.toUsdDecimal(p.getSize()));
                    position.setCollateral(MoldUtils.toUsdDecimal(p.getCollateral()));
                    position.setAveragePrice(MoldUtils.toUsdDecimal(p.getAveragePrice()));
                    position.setEntryFundingRate(MoldUtils.toFundingRateDecimal(p.getEntryFundingRate()));
                    positionDao.saveAndFlush(position);
                }
            }
        } catch (Exception e) {
            log.error("### PositionService: updatePositions error:", e);
        }
    }

    @Override
    public BigDecimal getLiqPrice(Position position) {

        try {
            BigDecimal positionFee = getPositionFee(position.getSize());

            BigDecimal cumulativeFundingRate = BigDecimal.ZERO;
            Map<String, BigDecimal> rates = readerService.getCumulativeFundingRates(position.getChain());
            cumulativeFundingRate = rates.get(position.getCollateralToken());

            BigDecimal fundingFee = getFundingFee(position.getSize(), position.getEntryFundingRate(), cumulativeFundingRate);

            BigDecimal marginFee = positionFee.add(fundingFee).add(Constants.liquidationFee);
            BigDecimal marginExceedMaxLeverage = position.getSize().divide(Constants.maxLeverage, 30, RoundingMode.FLOOR);

            BigDecimal liqPriceForFees = getLiqPriceFromSize(marginFee, position.getSize(), position.getCollateral(),
                    position.getAveragePrice(), position.isLong());
            BigDecimal liqPriceForMaxLeverage = getLiqPriceFromSize(marginExceedMaxLeverage, position.getSize(),
                    position.getCollateral(), position.getAveragePrice(), position.isLong());

//        log.info("liqPriceForFees: " + liqPriceForFees);
//        log.info("liqPriceForMaxLeverage: " + liqPriceForMaxLeverage);

            if (liqPriceForFees != null && liqPriceForFees.compareTo(BigDecimal.valueOf(-1)) == 0)
                return BigDecimal.valueOf(-1);

            if (liqPriceForFees == null)
                return liqPriceForMaxLeverage;

            if (liqPriceForMaxLeverage == null)
                return liqPriceForFees;

            if (position.isLong())
                return liqPriceForFees.compareTo(liqPriceForMaxLeverage) >= 0 ? liqPriceForFees : liqPriceForMaxLeverage;
            else
                return liqPriceForFees.compareTo(liqPriceForMaxLeverage) < 0 ? liqPriceForFees : liqPriceForMaxLeverage;
        } catch (Exception e) {
            log.error("### PositionService getLiqPrice error for position id: " + position.getId());
            log.error("### PositionService getLiqPrice error:", e);
            return BigDecimal.ZERO;
        }
    }

    public BigDecimal getPositionFee(BigDecimal size) {
        return size.multiply(Constants.marginFeePoints);
    }

    public BigDecimal getFundingFee(BigDecimal size, BigDecimal entryFundingRate, BigDecimal cumulativeFundingRate) {
        return size.multiply(cumulativeFundingRate.subtract(entryFundingRate));
    }

    public BigDecimal getLiqPriceFromSize(BigDecimal liqAmount, BigDecimal size, BigDecimal collateral, BigDecimal averagePrice, boolean isLong) {
        if (size == null || size.compareTo(BigDecimal.ZERO) == 0)
            return BigDecimal.ZERO;

        if (liqAmount.compareTo(collateral) >= 0)
            return BigDecimal.valueOf(-1); // need to be liquidated now

        BigDecimal liquidationDelta = collateral.subtract(liqAmount).abs();

        BigDecimal priceDelta = liquidationDelta.multiply(averagePrice).divide(size, 30, RoundingMode.FLOOR);
        return isLong ? averagePrice.subtract(priceDelta) : averagePrice.add(priceDelta);
    }

}
