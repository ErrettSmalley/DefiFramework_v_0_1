package trade.mold.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "t_execution_log")
@DynamicUpdate
public class ExecutionLog {

    @Id
    private long id;
    private String hash;
    private String executor;
    private long timestamp;
    private String relId;
    private int status;
    private long chain;
    
}
