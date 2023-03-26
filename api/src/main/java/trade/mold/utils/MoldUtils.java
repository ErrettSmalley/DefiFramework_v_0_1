package trade.mold.utils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;

public class MoldUtils {

    private static final BigDecimal divisorUsd = BigDecimal.valueOf(Math.pow(10, 30));
    private static final BigDecimal divisorFundingRate = BigDecimal.valueOf(Math.pow(10, 6));

    public static BigDecimal toUsdDecimal(Object value) {
        return new BigDecimal((BigInteger) value).divide(divisorUsd, 30, RoundingMode.FLOOR);
    }

    public static BigDecimal toFundingRateDecimal(Object value) {
        return new BigDecimal((BigInteger) value).divide(divisorFundingRate, 30, RoundingMode.FLOOR);
    }
}
