package trade.mold.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import trade.mold.dao.ConfigDao;
import trade.mold.dao.PositionDao;
import trade.mold.entity.Position;
import trade.mold.service.PositionService;
import trade.mold.utils.Constants;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Component
public class UpdateTask {

    @Resource
    private PositionDao positionDao;

    @Resource
    private ConfigDao configDao;

    @Resource
    private PositionService positionService;

    @Scheduled(fixedRate = 60 * 1000, initialDelay = 10 * 1000)
    public void updateLiqPrice() {

        if (!Boolean.parseBoolean(configDao.getByName("task_liq_update_enabled").getValue()))
            return;

        log.info("### UpdateTask starting...");

        long chain = Long.parseLong(configDao.getByName("task_run_chains").getValue());

        List<Position> positions = positionDao.getPositionsByChainAndStatus(chain, Constants.positionOpen);
        int count = CollectionUtils.isEmpty(positions) ? 0 : positions.size();

        positions.forEach(position -> {
            BigDecimal newLiqPrice = positionService.getLiqPrice(position);
            if (BigDecimal.ZERO.compareTo(newLiqPrice) == 0)
                return;
            position.setLiqPrice(newLiqPrice);
            positionDao.saveAndFlush(position);
        });

        log.info("### UpdateTask done, updated positions count: " + count);
    }
}
