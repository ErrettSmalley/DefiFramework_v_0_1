package trade.mold.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StatsProfile {

    private BigDecimal totalVolume;
    private BigDecimal totalInterest;
    private BigDecimal LongPositionsSize;
    private BigDecimal ShortPositionSize;
    private int totalUsers;
}
