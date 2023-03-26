package trade.mold.service;

import org.web3j.protocol.core.methods.response.Log;
import trade.mold.entity.Position;

import java.math.BigDecimal;
import java.util.List;

public interface PositionService {

    void increasePosition(Log lg, long timestamp, long chain);

    void updatePosition(Log lg, long timestamp);

    void liquidatePosition(Position position, int robotIndex);

    void closePosition(Log lg, long timestamp);

    void liquidatePosition(long chain, Log lg, long timestamp);
    
    Position resetPosition(String key, long timestamp);

    BigDecimal getLiqPrice(Position position);
    
    void updatePositions(long chain, List<String> keys);

    void updateAccountProfit(long chain, String account, BigDecimal pnl);
}
