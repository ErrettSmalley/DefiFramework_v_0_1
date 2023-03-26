import {deployments, ethers} from 'hardhat';
import {getContracts, getLiqPrice} from "../helpers/utils";
import {formatEther, formatUnits, parseEther, parseUnits} from "ethers/lib/utils";

const {execute, read} = deployments;

async function main() {

    const {
        reader,
        vault,
        weth,
        wbtc,
        vaultReader,
        positionManager,
        router,
        rewardRouter,
        vaultUtils,
        mlp,
        user0,
        user1,
        dai,
        wnative,
        mlpManager
    } = await getContracts();
    // let user = "0x1df7121c6543888F0f7EcD3C07Ef5A265260c48D"; // long
    let user = "0x9B6B26Db5F9149F0e3f4DAF2Eb98307020236dDB"; // k

    let _collateralTokens = [weth.address, wnative.address, dai.address];
    let _indexTokens = [weth.address, wnative.address];

    // ===================== Aums ================================
    // let aums = await mlpManager.getAums();
    // console.log("max aum:", formatUnits(aums[0], 30));
    // console.log("min aum:", formatUnits(aums[1], 30));
    // let maxAum = await mlpManager.getAum(true);
    // let minAum = await mlpManager.getAum(false);
    // console.log("max aum:", formatUnits(maxAum, 30));
    // console.log("min aum:", formatUnits(minAum, 30));
    // let mlpTotal = await mlp.totalSupply();
    // console.log("mlp total:", formatEther(mlpTotal));
    // let mlpPrice = maxAum.div(mlpTotal);
    // console.log("mlp price:", formatUnits(mlpPrice, 12));

    // ===================== Price ================================
    // let maxPrice = await vault.getMaxPrice(wnative.address);
    // console.log("maxPrice:", formatUnits(maxPrice, 8));
    // let minPrice = await vault.getMinPrice(wnative.address);
    // console.log("minPrice:", formatUnits(minPrice, 8));

    // ===================== Params ================================
    // const marginFeeBasisPoints = await vault.marginFeeBasisPoints(); // 0.001 * sizeDelta
    // console.log("marginFeeBasisPoints:", formatEther(marginFeeBasisPoints));
    // const cumulativeFundingRates = await vault.cumulativeFundingRates(weth.address);
    // console.log("cumulativeFundingRates:", formatEther(cumulativeFundingRates));
    // const maxLeverage = await vault.maxLeverage();
    // console.log("maxLeverage:", maxLeverage.toNumber());
    // const liquidationFeeUsd = await vault.liquidationFeeUsd();
    // console.log("liquidationFeeUsd:", formatUnits(liquidationFeeUsd, 30));
    // let aumAddition = await mlpManager.aumAddition();
    // console.log("aumAddition:", aumAddition);
    // let aumDeduction = await mlpManager.aumDeduction();
    // console.log("aumDeduction:", aumDeduction);

    // ===================== Requests ================================
    // let count = await positionRouter.increasePositionsIndex(user);
    // console.log("count:", count.toNumber());
    // let key = await positionRouter.getRequestKey(user, count);
    // let request = await positionRouter.increasePositionRequests(key);
    // console.log("request:", request);

    // ===================== Positions ================================
    // let _isLong = [false];
    // // let positions = await reader.getPositions(vault.address, user, _collateralTokens, _indexTokens, _isLong);
    // let positions = await reader.getPositions(vault.address, '0x603666f69a88c21f9d56ab09876e835f5ee59da5', [dai.address], [wnative.address], _isLong);
    // for (let i = 0; i < positions.length;) {
    //     console.log(" ===================================================== ");
    //     console.log("$size:", formatUnits(positions[i++], 30));
    //     console.log("$collateral:", formatUnits(positions[i++], 30));
    //     console.log("$averagePrice:", formatUnits(positions[i++], 30));
    //     console.log("entryFundingRate:", positions[i++].toNumber());
    //     console.log("hasRealisedProfit:", positions[i++].toNumber());
    //     console.log("$realisedPnl", formatUnits(positions[i++], 30));
    //     console.log("lastIncreasedTime", positions[i++].toNumber());
    //     console.log("hasProfit", positions[i++].toNumber());
    //     console.log("delta", formatUnits(positions[i++], 30));
    // }

    // ===================== Position Raw ================================
    // let key = await vault.getPositionKey(user, weth.address, weth.address, true);
    // let positionRaw = await vault.positions(key);
    // console.log("positionRaw:", positionRaw);

    // ===================== Amounts ================================
    // let poolAmount = await vault.poolAmounts(dai.address);
    // console.log("poolAmount DAI:", formatEther(poolAmount));
    // let reservedAmount = await vault.reservedAmounts(dai.address);
    // console.log("reservedAmount DAI:", formatEther(reservedAmount));
    // console.log("available DAI:", formatEther(poolAmount.sub(reservedAmount)))
    // let feeAmount = await vault.feeReserves(dai.address);
    // console.log("feeAmount DAI:", formatEther(feeAmount));
    // console.log("total DAI:", formatEther(poolAmount.add(feeAmount)));
    // let tokenBalance = await vault.tokenBalances(dai.address);
    // console.log("tokenBalances DAI:", formatEther(tokenBalance));

    // non-stable-token: tokenBalance = poolAmount + feeAmount
    // stable-token: tokenBalance = poolAmount + feeAmount + user's total collateral

    // let poolAmount = await vault.poolAmounts(weth.address);
    // console.log("poolAmount weth:", formatEther(poolAmount));
    // let reservedAmount = await vault.reservedAmounts(weth.address);
    // console.log("reservedAmount weth:", formatEther(reservedAmount));
    // console.log("available weth:", formatEther(poolAmount.sub(reservedAmount)))
    // let feeAmount = await vault.feeReserves(weth.address);
    // console.log("feeAmount weth:", formatEther(feeAmount));
    // console.log("total weth:", formatEther(poolAmount.add(feeAmount)));
    // let tokenBalance = await vault.tokenBalances(weth.address);
    // console.log("tokenBalances weth:", formatEther(tokenBalance));

    // let poolAmount = await vault.poolAmounts(wbtc.address);
    // console.log("poolAmount wbtc:", formatUnits(poolAmount, 8));
    // let reservedAmount = await vault.reservedAmounts(wbtc.address);
    // console.log("reservedAmount wbtc:", formatUnits(reservedAmount, 8));
    // console.log("available wbtc:", formatUnits(poolAmount.sub(reservedAmount, 8)))
    // let feeAmount = await vault.feeReserves(wbtc.address);
    // console.log("feeAmount wbtc:", formatUnits(feeAmount, 8));
    // console.log("total wbtc:", formatUnits(poolAmount.add(feeAmount), 8));
    // let tokenBalance = await vault.tokenBalances(wbtc.address);
    // console.log("tokenBalances wbtc:", formatUnits(tokenBalance, 8));

    // ===================== getVaultTokenInfoV4 ================================
    // const info = await vaultReader.getVaultTokenInfoV4(vault.address, positionRouter.address, weth.address, parseEther("100"), _collateralTokens);
    // for (let i = 0; i < info.length; i++) {
    //     console.log("info-" + i + ":", formatEther(info[i]));
    // }

    // ===================== getFundingRates ================================
    // const rates = await reader.getFundingRates(vault.address, wnative.address, [wbtc.address, dai.address]);
    // for (let i = 0; i < rates.length; i++)
    //     console.log("rate-" + i + ":", rates[i].toNumber());

    // ===================== Receipt ================================
    // let hash = "0x277322897159a07db53edf5f6bbb6aff4c6e2e9cd59bbc41e3aaac3fc1ebc3d6";
    // let receipt = await ethers.provider.getTransactionReceipt(hash);
    // console.log("receipt:", receipt);

    // ===================== Token Balances ================================
    // let account = "0x1df7121c6543888F0f7EcD3C07Ef5A265260c48D";
    // let tokens = [
    //     "0x0000000000000000000000000000000000000000",
    //     "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    //     "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690",
    // ]
    // let tokenBalances = await reader.getTokenBalances(account, tokens);
    // console.log("balance:", tokenBalances)

    // ===================== Buy Fees ================================
    // let feeBasisPoints = await vaultUtils.getBuyUsdmFeeBasisPoints(weth.address, parseEther("1499"));
    // console.log("BuyUsdmFee:", feeBasisPoints.toNumber());
    // let mlpBalance = await mlp.balanceOf("0x9B6B26Db5F9149F0e3f4DAF2Eb98307020236dDB");
    // console.log("mlp balance:", formatEther(mlpBalance));

    // ===================== Liq Price ================================
    // let position = {
    //     size: parseUnits("15000", 30),
    //     collateral: parseUnits("1484", 30),
    //     averagePrice: parseUnits("1504", 30),
    //     entryFundingRate: 0,
    //     collateralToken: weth.address
    // }
    // let cumulativeFundingRates = await vault.cumulativeFundingRates(weth.address);
    // let price = getLiqPrice(position, cumulativeFundingRates, true);
    // console.log("liqPrice:", formatUnits(price, 30));
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
