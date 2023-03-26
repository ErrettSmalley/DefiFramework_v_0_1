package trade.mold.service.impl;

import org.springframework.stereotype.Service;
import trade.mold.dao.ConfigDao;
import trade.mold.entity.Config;
import trade.mold.service.ConfigService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ConfigServiceImpl implements ConfigService {

    @Resource
    private ConfigDao configDao;
    
    @Override
    public Map<String, String> getConfigsByChainAndNames(long chain, List<String> names) {
        return configDao.getByChainAndNameIsIn(chain, names).stream().collect(Collectors.toMap(Config::getName, Config::getValue));
    }
}
