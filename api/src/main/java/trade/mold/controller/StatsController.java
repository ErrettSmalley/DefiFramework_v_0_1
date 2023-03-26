package trade.mold.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import trade.mold.dao.ConfigDao;
import trade.mold.dao.PositionDao;
import trade.mold.dto.StatsProfile;
import trade.mold.dto.ResultBean;

import javax.annotation.Resource;
import java.math.BigDecimal;

@Slf4j
@CrossOrigin
@Controller
@RequestMapping("stats")
public class StatsController {

    @Resource
    private PositionDao positionDao;

    @Resource
    private ConfigDao configDao;

    @GetMapping("profile")
    @ResponseBody
    public ResultBean statsProfile() {

        try {
            StatsProfile profile = new StatsProfile();
            profile.setTotalVolume(new BigDecimal(configDao.getByChainAndName(80001, "total_volume").getValue()));
            BigDecimal totalLong = positionDao.getLongPositionsSizeByChainId(80001);
            BigDecimal totalShort = positionDao.getShortPositionsSizeByChainId(80001);
            totalLong = totalLong == null ? BigDecimal.ZERO : totalLong;
            totalShort = totalShort == null ? BigDecimal.ZERO : totalShort;
            profile.setLongPositionsSize(totalLong);
            profile.setShortPositionSize(totalShort);
            profile.setTotalInterest(totalLong.add(totalShort));

            int i = positionDao.countUsersByChain(80001);
            profile.setTotalUsers(i);
            
            return ResultBean.suc(profile);
        } catch (Exception e) {
            log.error("StatsController statsProfile error:", e);
            return ResultBean.fail();
        }
    }
}
