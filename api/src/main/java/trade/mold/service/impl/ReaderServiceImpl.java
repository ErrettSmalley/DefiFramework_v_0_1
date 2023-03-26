package trade.mold.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import trade.mold.client.Web3jClient;
import trade.mold.service.ConfigService;
import trade.mold.service.ReaderService;
import trade.mold.utils.Constants;
import trade.mold.utils.MoldUtils;
import trade.mold.utils.Names;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Service
public class ReaderServiceImpl implements ReaderService {

    @Resource
    private Web3jClient web3jClient;

    @Resource
    private ConfigService configService;

    @Override
    @Cacheable(value = "customer", key = "#chain")
    public Map<String, BigDecimal> getCumulativeFundingRates(long chain) throws Exception {
        log.info(">>> Raw getCumulativeFundingRates...");
        Map<String, String> configs = configService.getConfigsByChainAndNames(chain,
                Arrays.asList(Names.reader, Names.vault, Names.weth, Names.wbtc, Names.wnative, Names.dai));

        String wnative = configs.get(Names.wnative);
        String weth = configs.get(Names.weth);
        String wbtc = configs.get(Names.wbtc);
        String dai = configs.get(Names.dai);
        Function function = new Function("getFundingRates", Arrays.asList(
                new Address(configs.get(Names.vault)),
                new Address(configs.get(Names.wnative)),
                new DynamicArray(Address.class, Arrays.asList(
                        new Address(wnative),
                        new Address(weth),
                        new Address(wbtc),
                        new Address(dai)
                ))),
                Collections.singletonList(new TypeReference<DynamicArray<Uint256>>() {
                }));

        Map<String, BigDecimal> result = new HashMap<>();

        List<Type> res = web3jClient.viewContractFunction(function, configs.get(Names.reader), Constants.zeroAddress);
        if (CollectionUtils.isEmpty(res))
            throw new Exception("ReaderService empty funding rates.");

        List<Uint256> rates = (List<Uint256>) res.get(0).getValue();
        result.put(wnative, MoldUtils.toFundingRateDecimal(rates.get(1).getValue()));
        result.put(weth, MoldUtils.toFundingRateDecimal(rates.get(3).getValue()));
        result.put(wbtc, MoldUtils.toFundingRateDecimal(rates.get(5).getValue()));
        result.put(dai, MoldUtils.toFundingRateDecimal(rates.get(7).getValue()));
        return result;
    }
}
