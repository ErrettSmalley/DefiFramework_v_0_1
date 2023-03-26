package trade.mold.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "t_config")
@DynamicUpdate
public class Config {

    @Id
    private long id;
    private String name;
    private String value;
    private long chain;

}
