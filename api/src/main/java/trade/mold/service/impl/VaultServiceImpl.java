package trade.mold.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.*;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.utils.Numeric;
import trade.mold.client.Web3jClient;
import trade.mold.dao.ConfigDao;
import trade.mold.dto.PositionStruct;
import trade.mold.service.VaultService;
import trade.mold.utils.Constants;
import trade.mold.utils.MoldUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class VaultServiceImpl implements VaultService {

    @Resource
    private Web3jClient web3jClient;

    @Resource
    private ConfigDao configDao;

    @Override
    public BigDecimal cumulativeFundingRates(String token, long chain) {
        return MoldUtils.toFundingRateDecimal(getUint256From("cumulativeFundingRates", token, chain));
    }

    @Override
    public BigDecimal getMaxPrice(String token, long chain) {
        return MoldUtils.toUsdDecimal(getUint256From("getMaxPrice", token, chain));
    }

    @Override
    public BigDecimal getMinPrice(String token, long chain) {
        return MoldUtils.toUsdDecimal(getUint256From("getMinPrice", token, chain));
    }

    private Object getUint256From(String func, String key, long chain) {
        String vault = configDao.getByChainAndName(chain, "vault_contract").getValue();
        Function function = new Function(func, Collections.singletonList(new Address(key)),
                Collections.singletonList(new TypeReference<Uint256>() {
                }));
        try {
            List<Type> res = web3jClient.viewContractFunction(function, vault, Constants.zeroAddress);
            return res.get(0).getValue();
        } catch (Exception e) {
            log.error("### VaultService cumulativeFundingRates error:", e);
            return BigInteger.ZERO;
        }
    }

    @Override
    public boolean isPositionExist(String key, long chain) {
        String vault = configDao.getByChainAndName(chain, "vault_contract").getValue();
        Function function = new Function("positions", Collections.singletonList(new Bytes32(Numeric.hexStringToByteArray(key))),
                Collections.singletonList(new TypeReference<PositionStruct>() {
                }));
        try {
            List<Type> res = web3jClient.viewContractFunction(function, vault, Constants.zeroAddress);
            if (CollectionUtils.isEmpty(res)) {
                return false;
            } else {
                PositionStruct p = (PositionStruct) res.get(0);
                return p.getSize().compareTo(BigInteger.ZERO) != 0;
            }
        } catch (Exception e) {
            log.error("### VaultService isPositionExist error:", e);
            return false;
        }
    }

}
