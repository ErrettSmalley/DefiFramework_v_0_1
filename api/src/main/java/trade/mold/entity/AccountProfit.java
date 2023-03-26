package trade.mold.entity;


import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "t_account_profit")
@DynamicUpdate
public class AccountProfit {
    
    @Id
    private long id;
    private String account;
    private BigDecimal profit;
    private long chain;
}
