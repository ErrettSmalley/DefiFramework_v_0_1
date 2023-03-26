package trade.mold.utils;

import java.math.BigDecimal;

public interface Constants {

    // common
    String zeroAddress = "0x0000000000000000000000000000000000000000";

    // mold params
    BigDecimal maxLeverage = BigDecimal.valueOf(100);
    BigDecimal marginFeePoints = BigDecimal.valueOf(0.001);
    BigDecimal liquidationFee = BigDecimal.valueOf(5);

    // position status
    int positionOpen = 0;
    int positionLiquidating = 1;
    int positionClosed = 2;

    // robot status
    int robotNoBalance = 0;
    int robotFree = 1;
    int robotInUse = 2;

    // execution status
    int executionWaiting = 0;
    int executionFail = 1;
    int executionSuc = 2;
}
