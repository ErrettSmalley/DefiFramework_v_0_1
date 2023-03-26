package trade.mold.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import trade.mold.client.Web3jClient;
import trade.mold.dao.ConfigDao;
import trade.mold.dao.ExecutionLogDao;
import trade.mold.dao.RobotDao;
import trade.mold.entity.ExecutionLog;
import trade.mold.utils.Constants;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Component
public class CheckTask {

    @Resource
    private Web3jClient web3jClient;

    @Resource
    private ExecutionLogDao executionLogDao;

    @Resource
    private RobotDao robotDao;

    @Resource
    private ConfigDao configDao;

    @Scheduled(fixedRate = 60 * 1000, initialDelay = 60 * 1000)
    @Transactional
    public void transactionStatusCheck() {

        if (!Boolean.parseBoolean(configDao.getByName("task_check_enabled").getValue()))
            return;

        log.info("### CheckTask starting...");

        long startTime = System.currentTimeMillis();

        long timestampBefore = startTime / 1000 - 60;
        List<ExecutionLog> exLogs = executionLogDao.getExecutionLogsByStatusAndTimestampLessThan(Constants.executionWaiting, timestampBefore);

        int count = 0;
        if (!CollectionUtils.isEmpty(exLogs))
            count = exLogs.size();

        exLogs.forEach(exLog -> {
            String hash = exLog.getHash();
            log.info("### CheckTask checking hash: " + hash);

            boolean suc = web3jClient.isTxSuccess(hash);
            if (suc) {
                exLog.setStatus(Constants.executionSuc);
//                positionService.resetPosition(exLog.getRelId(), exLog.getTimestamp());
            } else {
                log.error("### CheckTask fail tx: " + hash);
                exLog.setStatus(Constants.executionFail);
            }
            robotDao.updateRobotStatus(exLog.getExecutor(), Constants.robotFree);
            executionLogDao.save(exLog);
        });

        log.info(String.format("### CheckTask done, count: %s, time spent %s (ms): ", count, System.currentTimeMillis() - startTime));
    }

}
