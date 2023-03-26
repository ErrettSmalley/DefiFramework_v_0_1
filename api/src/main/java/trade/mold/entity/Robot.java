package trade.mold.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "t_robot")
@DynamicUpdate
public class Robot {

    @Id
    private String id;
    private String address;
    private int index;
    private int status;

}
