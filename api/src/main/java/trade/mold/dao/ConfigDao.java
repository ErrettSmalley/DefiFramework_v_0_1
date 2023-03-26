package trade.mold.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import trade.mold.entity.Config;

import java.util.List;

@Repository
public interface ConfigDao extends JpaRepository<Config, Long> {

    Config getByName(String name);

    Config getByChainAndName(long chain, String name);

    List<Config> getByChainAndNameIsIn(long chain, List<String> names);

    @Transactional
    @Modifying
    @Query("UPDATE Config c set c.value=:newValue WHERE c.name =:name AND c.chain=:chain")
    void updateConfig(String name, long chain, String newValue);
}
