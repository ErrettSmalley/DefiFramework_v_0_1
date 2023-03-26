package trade.mold.service;

import java.math.BigDecimal;
import java.util.Map;

public interface ReaderService {

    Map<String, BigDecimal> getCumulativeFundingRates(long chain) throws Exception;
}
