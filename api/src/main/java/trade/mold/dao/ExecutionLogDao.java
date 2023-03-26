package trade.mold.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trade.mold.entity.ExecutionLog;

import java.util.List;

@Repository
public interface ExecutionLogDao extends JpaRepository<ExecutionLog, Long> {
    
    List<ExecutionLog> getExecutionLogsByStatusAndTimestampLessThan(int status, long timestamp);
}
