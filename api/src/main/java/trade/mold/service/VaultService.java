package trade.mold.service;

import java.math.BigDecimal;

public interface VaultService {

    BigDecimal cumulativeFundingRates(String token, long chain);
    
    BigDecimal getMaxPrice(String token, long chain);

    BigDecimal getMinPrice(String token, long chain);

    boolean isPositionExist(String key, long chain);
}
