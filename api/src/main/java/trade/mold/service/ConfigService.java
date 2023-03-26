package trade.mold.service;

import java.util.List;
import java.util.Map;

public interface ConfigService {

    Map<String, String> getConfigsByChainAndNames(long chain, List<String> names);
}
