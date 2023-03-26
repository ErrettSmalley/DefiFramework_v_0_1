package trade.mold.task;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.Transaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import trade.mold.client.Web3jClient;
import trade.mold.dao.ConfigDao;
import trade.mold.service.ConfigService;
import trade.mold.service.PositionService;
import trade.mold.utils.Events;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class BlockTask {

    @Resource
    private Web3jClient web3jClient;

    @Resource
    private PositionService positionService;

    @Resource
    private ConfigDao configDao;

    @Resource
    private ConfigService configService;

    @Scheduled(fixedDelay = 20 * 1000, initialDelay = 10 * 1000)
    public void chase() {

        if (!Boolean.parseBoolean(configDao.getByName("task_block_enabled").getValue()))
            return;

        log.info("### BlockTask starting...");

        long startTime = System.currentTimeMillis();

        long chain = Long.parseLong(configDao.getByName("task_run_chains").getValue());

        Map<String, String> configs = configService.getConfigsByChainAndNames(chain,
                Arrays.asList("saved_block_number", "fallback_block_number", "position_manager_contract"));

        long savedBlockNumber = Long.parseLong(configs.get("saved_block_number"));
        long fallbackBlockNumber = Long.parseLong(configs.get("fallback_block_number"));

        String contract = configs.get("position_manager_contract");
        Set<String> targetContracts = new HashSet<>();
        targetContracts.add(contract);

        long chasingBlockNumber;
        try {
            long latestBlockNumber = web3jClient.latestBlockNumber().longValue();
            chasingBlockNumber = latestBlockNumber - fallbackBlockNumber;
        } catch (Exception e) {
            log.error("### BlockTask latestBlockNumber error: ", e);
            return;
        }

        log.info("### BlockTask start at block: " + ++savedBlockNumber + ", chasing block: " + chasingBlockNumber);

        try {
            long savingInterval = 200;
            long lastSavedBlock = savedBlockNumber;

            // chasing block
            for (long i = savedBlockNumber; i < chasingBlockNumber; i++) {

                log.info("### scanning at block: " + i);
                EthBlock.Block block = web3jClient.getBlockByNumber(i);
                long timestamp = block.getTimestamp().longValue();

                // scanning txs
                List<Transaction> transactions = block.getTransactions().stream()
                        .map(transactionResult -> (Transaction) transactionResult.get())
                        .collect(Collectors.toList());

                transactions.forEach(tx -> {
                    if (StringUtils.isBlank(tx.getTo()))
                        return;

                    String to = tx.getTo().toLowerCase();
                    if (targetContracts.contains(to)) {
                        String hash = tx.getHash();
                        TransactionReceipt receipt = web3jClient.getTransactionReceiptByHash(hash);
//                        log.info("receipt: " + receipt);
                        
                        if (!"0x1".equals(receipt.getStatus()))
                            return;

                        List<Log> logs = receipt.getLogs();
                        logs.forEach(lg -> {
                            List<String> topics = lg.getTopics();
                            if (topics.size() > 1)
                                return;
                            topics.forEach(topic -> {
                                if (Events.IncreasePosition_Hash.equalsIgnoreCase(topic)) {
                                    log.info(">> Catch increase: " + hash);
                                    positionService.increasePosition(lg, timestamp, chain);
                                } else if (Events.UpdatePosition_Hash.equalsIgnoreCase(topic)) {
                                    log.info(">> Catch update: " + hash);
                                    positionService.updatePosition(lg, timestamp);
                                } else if (Events.ClosePosition_Hash.equalsIgnoreCase(topic)) {
                                    log.info(">> Catch close: " + hash);
                                    positionService.closePosition(lg, timestamp);
                                } else if (Events.LiquidatePosition_Hash.equalsIgnoreCase(topic)) {
                                    log.info(">> Catch liquidate: " + hash);
                                    positionService.liquidatePosition(chain, lg, timestamp);
                                }
                            });
                        });
//                        log.info("value: " + tx.getValue());
                    }
                });

                if (i - lastSavedBlock >= savingInterval) {
                    log.info("### Saving block height: " + i);
                    configDao.updateConfig("saved_block_number", chain, String.valueOf(i));
                    lastSavedBlock = i;
                    if (!Boolean.parseBoolean(configDao.getByName("task_block_enabled").getValue()))
                        break;
                }
            }

            configDao.updateConfig("saved_block_number", chain, String.valueOf(--chasingBlockNumber));

        } catch (Exception e) {
            log.error("### BlockTask getBlockByNumber error:", e);
            return;
        }

        log.info("### BlockTask done, time spent (ms): " + (System.currentTimeMillis() - startTime));
    }

}
