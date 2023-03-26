package trade.mold.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "t_position")
@DynamicUpdate
public class Position {

    @Id
    private String id;
    private String account;
    private String collateralToken;
    private String indexToken;
    private boolean isLong;
    private BigDecimal size;
    private BigDecimal collateral;
    private BigDecimal averagePrice;
    private BigDecimal entryFundingRate;
    private int status;
    private BigDecimal liqPrice;
    private long createTimestamp;
    private long updateTimestamp;
    private long chain;

}
