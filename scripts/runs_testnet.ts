import {deployments, ethers} from 'hardhat';
import {getContracts, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatUnits, parseEther, parseUnits} from "ethers/lib/utils";
import {PriceFeed} from "../typechain";

const {execute, read} = deployments;

async function main() {

    const {owner, positionManager, wnative, weth, dai, timelock, vault} = await getContracts();

    // ===================== Distribute fee to robots ================================
    // let robots = [
    //     "0x1b87292764856c0504e63d561b1cc033e9bf8f89",
    //     "0xd3a962e594a4f6a15ac3e73edaa94e9c6398e68c"
    // ]
    //
    // for (let i = 0; i < robots.length; i++) {
    //     await owner.sendTransaction({
    //         to: robots[i],
    //         value: parseEther("0.1")
    //     })
    // }

    // ===================== Set liquidators ================================
    // let liquidators = [
    //     "0x1b87292764856c0504e63d561b1cc033e9bf8f89",
    //     "0xd3a962e594a4f6a15ac3e73edaa94e9c6398e68c"
    // ]
    // for (let i = 0; i < liquidators.length; i++) {
    //     await positionManager.setLiquidator(liquidators[i], true);
    // }

    // ===================== Pricing ================================
    // let wnativePriceFeed = await ethers.getContract<PriceFeed>("WNativePriceFeed");
    // await wnativePriceFeed.setLatestAnswer(toChainlinkPrice(1.065))
    // await wnativePriceFeed.setLatestAnswer(toChainlinkPrice(1.07))
    // await wnativePriceFeed.setLatestAnswer(toChainlinkPrice(1.061))

    // let WethPriceFeed = await ethers.getContract<PriceFeed>("WethPriceFeed");
    // await WethPriceFeed.setLatestAnswer(toChainlinkPrice(1187))
    // await WethPriceFeed.setLatestAnswer(toChainlinkPrice(1539))
    // await WethPriceFeed.setLatestAnswer(toChainlinkPrice(1538))

    // ===================== Send tokens ================================
    // let users = [
    //     // "0x1df7121c6543888F0f7EcD3C07Ef5A265260c48D", // long
    //     // "0x9B6B26Db5F9149F0e3f4DAF2Eb98307020236dDB", // k
    //     // "0x37A008Be830CEd0662f52E8fac4ac6c6240DC2c9" // cj
    //     // "0x603666f69a88c21F9D56AB09876e835F5eE59dA5", // cl
    //     // "0x7f0f9885CEa8611a0fc8eAF493E832337d0420e5" // sun
    // ]
    //
    // let sendAmount = parseEther("10000");
    // for (let i = 0; i < users.length; i++) {
    //     await wnative.mint(users[i], sendAmount);
    //     await dai.mint(users[i], sendAmount);
    //     await weth.mint(users[i], sendAmount);
    // }
    // await dai.mint("0xE9883A17Ef193241dec09DC213A0D2aaE0462da2", parseEther("10000"));

    // ===================== Close ================================
    // let paramsDe = [
    //     [weth.address], // _path
    //     weth.address, // _indexToken
    //     toUsd(0), // _collateralDelta
    //     toUsd(18693.56), // _sizeDelta
    //     true, // _isLong
    //     owner.address,  // _receiver
    //     toUsd(1400),  // _price
    //     toUsd(0), // _minOut
    //     false // _withdrawETH
    // ]
    // await positionManager.decreasePosition(...paramsDe);
    //
    // console.log("Done.")

    // ===================== Liquidate ================================
    // await positionManager.setLiquidator(owner.address, true);
    // await positionManager.liquidatePosition(owner.address, weth.address, weth.address, true, owner.address);

    // ===================== setFees ================================
    // console.log("taxBasisPoints", (await vault.taxBasisPoints()).toNumber());
    // console.log("stableTaxBasisPoints", (await vault.stableTaxBasisPoints()).toNumber());
    // console.log("mintBurnFeeBasisPoints", (await vault.mintBurnFeeBasisPoints()).toNumber());
    // console.log("swapFeeBasisPoints", (await vault.swapFeeBasisPoints()).toNumber());
    // console.log("stableSwapFeeBasisPoints", (await vault.stableSwapFeeBasisPoints()).toNumber());
    // console.log("marginFeeBasisPoints", (await vault.marginFeeBasisPoints()).toNumber());
    // console.log("liquidationFeeUsd", formatUnits(await vault.liquidationFeeUsd(), 30));
    // console.log("minProfitTime", (await vault.minProfitTime()).toNumber());
    // console.log("hasDynamicFees", await vault.hasDynamicFees());

    // await timelock.setMarginFeeBasisPoints(10, 10);

    // await timelock.setFees(
    //     vault.address,
    //     50, // _taxBasisPoints,
    //     20, // _stableTaxBasisPoints,
    //     30, // _mintBurnFeeBasisPoints,
    //     30, // _swapFeeBasisPoints,
    //     4, // _stableSwapFeeBasisPoints,
    //     10, // _marginFeeBasisPoints,
    //     parseUnits("5", 30), // _liquidationFeeUsd,
    //     0, // _minProfitTime,
    //     false
    // );

    // ===================== setFaucets ================================
    // await dai.setInterval(30);
    // await wnative.setInterval(30);
    // await weth.setInterval(30);
    // await weth.setFaucetAmount(parseEther("10"));


    await positionManager.setLiquidator("0x0cc60f3e4a6c3fbbcd932489c72b7c07bc49251d", true);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
