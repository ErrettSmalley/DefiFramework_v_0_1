package trade.mold.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trade.mold.entity.AccountProfit;

@Repository
public interface AccountProfitDao extends JpaRepository<AccountProfit, Long> {

    AccountProfit getByChainAndAccount(long chain, String account);

}
