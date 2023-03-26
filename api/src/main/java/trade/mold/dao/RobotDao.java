package trade.mold.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import trade.mold.entity.Robot;

import java.util.List;

@Repository
public interface RobotDao extends JpaRepository<Robot, Long> {

    List<Robot> getRobotsByStatus(int status);

    @Modifying
    @Query("UPDATE Robot r set r.status=:newStatus WHERE r.address =:address")
    void updateRobotStatus(String address, int newStatus);
}
