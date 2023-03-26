package trade.mold.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import trade.mold.client.Web3jClient;
import trade.mold.dao.ConfigDao;
import trade.mold.dao.PositionDao;
import trade.mold.dao.RobotDao;
import trade.mold.entity.Position;
import trade.mold.entity.Robot;
import trade.mold.service.PositionService;
import trade.mold.service.VaultService;
import trade.mold.utils.Constants;
import trade.mold.utils.Names;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class LiquidateTask {

    @Resource
    private Web3jClient web3jClient;

    @Resource
    private PositionService positionService;

    @Resource
    private VaultService vaultService;

    @Resource
    private ConfigDao configDao;

    @Resource
    private PositionDao positionDao;

    @Resource
    private RobotDao robotDao;

    @Scheduled(fixedRate = 30 * 1000, initialDelay = 60 * 1000)
    @Transactional
    public void liquidate() {

        if (!Boolean.parseBoolean(configDao.getByName("task_liquidate_enabled").getValue()))
            return;

        log.info("### LiquidateTask starting...");

        long startTime = System.currentTimeMillis();

        long latestBlockNumber;
        try {
            latestBlockNumber = web3jClient.latestBlockNumber().longValue();
        } catch (Exception e) {
            log.error("### LiquidateTask latestBlockNumber error: ", e);
            return;
        }

        long chain = Long.parseLong(configDao.getByName("task_run_chains").getValue());
        long savedBlockNumber = Long.parseLong(configDao.getByChainAndName(chain, "saved_block_number").getValue());
        long fallbackBlockNumber = Long.parseLong(configDao.getByChainAndName(chain, "fallback_block_number").getValue());

        if (latestBlockNumber - savedBlockNumber > fallbackBlockNumber * 4) {
            log.info("### LiquidateTask out of blocks, exit.");
            return;
        }

        String weth = configDao.getByChainAndName(chain, Names.weth).getValue();
        liquidatePositions(weth, chain);

        String wnative = configDao.getByChainAndName(chain, Names.wnative).getValue();
        liquidatePositions(wnative, chain);

        String wbtc = configDao.getByChainAndName(chain, Names.wbtc).getValue();
        liquidatePositions(wbtc, chain);

        log.info("### LiquidateTask done, time spent (ms): " + (System.currentTimeMillis() - startTime));
    }

    private void liquidatePositions(String token, long chain) {
        BigDecimal minPrice = vaultService.getMinPrice(token, chain);
        BigDecimal maxPrice = vaultService.getMaxPrice(token, chain);
        List<Position> liqPositions = positionDao.getLiqPositions(chain, token, minPrice, maxPrice);
        
        if (CollectionUtils.isEmpty(liqPositions)) {
            log.info("### LiquidateTask no positions need to liquidate! Token: " + token);
            return;
        }

        List<Robot> robots = robotDao.getRobotsByStatus(Constants.robotFree);
        Collections.shuffle(robots);
        if (CollectionUtils.isEmpty(robots)) {
            log.error("### LiquidateTask no free robots!");
            return;
        }

        int use = 0;
        for (Position position : liqPositions) {
            if (use == robots.size())
                break;
            Robot robot = robots.get(use);
            if (!vaultService.isPositionExist(position.getId(), position.getChain()))
                continue;
            
            log.info("### LiquidateTask, liquidating position id: " + position.getId() + ", robotIndex: " + robot.getIndex());
            positionService.liquidatePosition(position, robot.getIndex());

            position.setStatus(Constants.positionLiquidating);
            positionDao.save(position);

            robot.setStatus(Constants.robotInUse);
            robotDao.save(robot);
            use++;
        }
    }
}
