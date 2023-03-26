package trade.mold.dto;

import lombok.Data;
import org.web3j.abi.datatypes.StaticStruct;
import org.web3j.abi.datatypes.generated.Int256;
import org.web3j.abi.datatypes.generated.Uint256;

import java.math.BigInteger;

@Data
public class PositionStruct extends StaticStruct {

    public BigInteger size;
    public BigInteger collateral;
    public BigInteger averagePrice;
    public BigInteger entryFundingRate;
    public BigInteger reserveAmount;
    public BigInteger realisedPnl;
    public BigInteger lastIncreasedTime;

    public PositionStruct(Uint256 size, Uint256 collateral, Uint256 averagePrice, Uint256 entryFundingRate,
                          Uint256 reserveAmount, Int256 realisedPnl, Uint256 lastIncreasedTime) {
        super(
                size,
                collateral,
                averagePrice,
                entryFundingRate,
                reserveAmount,
                realisedPnl,
                lastIncreasedTime
        );

        this.size = size.getValue();
        this.collateral = collateral.getValue();
        this.averagePrice = averagePrice.getValue();
        this.entryFundingRate = entryFundingRate.getValue();
        this.reserveAmount = reserveAmount.getValue();
        this.realisedPnl = realisedPnl.getValue();
        this.lastIncreasedTime = lastIncreasedTime.getValue();
    }

    public PositionStruct(BigInteger size, BigInteger collateral, BigInteger averagePrice, BigInteger entryFundingRate,
                          BigInteger reserveAmount, BigInteger realisedPnl, BigInteger lastIncreasedTime) {
        super(
                new Uint256(size),
                new Uint256(collateral),
                new Uint256(averagePrice),
                new Uint256(entryFundingRate),
                new Uint256(reserveAmount),
                new Int256(realisedPnl),
                new Uint256(lastIncreasedTime)
        );

        this.size = size;
        this.collateral = collateral;
        this.averagePrice = averagePrice;
        this.entryFundingRate = entryFundingRate;
        this.reserveAmount = reserveAmount;
        this.realisedPnl = realisedPnl;
        this.lastIncreasedTime = lastIncreasedTime;
    }


}
