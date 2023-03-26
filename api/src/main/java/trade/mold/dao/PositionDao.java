package trade.mold.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import trade.mold.entity.Position;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PositionDao extends JpaRepository<Position, Long> {

    int countPositionById(String id);

    @Query("SELECT COUNT(DISTINCT p.account) FROM Position p WHERE p.chain=:chain")
    int countUsersByChain(long chain);

    @Query("SELECT SUM(p.size) FROM Position p WHERE p.status=0 AND p.isLong is True AND p.chain=:chain")
    BigDecimal getLongPositionsSizeByChainId(long chain);

    @Query("SELECT SUM(p.size) FROM Position p WHERE p.status=0 AND p.isLong is FALSE AND p.chain=:chain")
    BigDecimal getShortPositionsSizeByChainId(long chain);

    List<Position> getPositionsByIdIn(List<String> ids);

    Position getById(String id);

    @Query("FROM Position WHERE chain=:chain AND indexToken=:token AND status=0 AND (" +
            " (isLong is TRUE AND liqPrice>:minPrice)" +
            " OR (isLong is FALSE AND liqPrice<:maxPrice)" +
            " OR liqPrice = -1) ")
    List<Position> getLiqPositions(long chain, String token, BigDecimal minPrice, BigDecimal maxPrice);

    List<Position> getPositionsByChainAndStatus(long chain, int status);
}
