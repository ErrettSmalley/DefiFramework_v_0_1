import {getContracts} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {BASIS_POINTS_DIVISOR} from "../helpers/constants";

async function main() {

    const {
        router,
        timelock,
        positionManager,
        wnative,
        weth,
        wbtc,
        vault,
        owner,
        dai,
        rewardRouter,
        mlpManager
    } = await getContracts();

    await timelock.setMaxLeverage(vault.address, 100 * BASIS_POINTS_DIVISOR);
    // await timelock.setFundingRate(vault.address, 600, 100, 100);

    let liquidators = [
        "0x1b87292764856c0504e63d561b1cc033e9bf8f89",
        "0xd3a962e594a4f6a15ac3e73edaa94e9c6398e68c",
        "0x0cc60f3e4a6c3fbbcd932489c72b7c07bc49251d"
    ]
    for (let i = 0; i < liquidators.length; i++) {
        await positionManager.setLiquidator(liquidators[i], true);
    }

    // mint tokens
    let receiver = "0x603666f69a88c21F9D56AB09876e835F5eE59dA5";
    await wnative.mint(receiver, parseEther("1000000"));
    await dai.mint(receiver, parseEther("1000000"));
    await weth.mint(receiver, parseEther("1000"));
    await wbtc.mint(receiver, parseUnits("100", 8));

    // let sendAmount = parseEther("10000");
    // console.log("weth in...")
    // let wethAmountIn = parseEther("100");
    // await weth.mint(owner.address, wethAmountIn.add(sendAmount));
    // await weth.connect(owner).approve(mlpManager.address, ApproveAmount);
    // await rewardRouter.connect(owner).mintAndStakeMlp(weth.address, wethAmountIn, 0, 0);

    // console.log("wnative in...")
    // let wnativeAmountIn = parseEther("100000");
    // await wnative.mint(owner.address, wnativeAmountIn.add(sendAmount));
    // await wnative.connect(owner).approve(mlpManager.address, ApproveAmount);
    // await rewardRouter.connect(owner).mintAndStakeMlp(wnative.address, wnativeAmountIn, 0, 0);

    // console.log("dai in...")
    // let daiAmountIn = parseEther("100000");
    // await dai.mint(owner.address, daiAmountIn.add(sendAmount));
    // await dai.connect(owner).approve(mlpManager.address, ApproveAmount);
    // await rewardRouter.connect(owner).mintAndStakeMlp(dai.address, daiAmountIn, 0, 0);

    // console.log("eth price waving...")
    // await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1500));
    // await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1504));
    // await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1499));

    // console.log("send tokens...");
    // let users = [
    //     "0x1df7121c6543888F0f7EcD3C07Ef5A265260c48D", // long
    //     // "0x9B6B26Db5F9149F0e3f4DAF2Eb98307020236dDB", // k
    //     // "0x37A008Be830CEd0662f52E8fac4ac6c6240DC2c9" // cj
    // ]

    // for (let i = 0; i < users.length; i++) {
    //     await wnative.mint(users[i], sendAmount);
    //     await dai.mint(users[i], sendAmount);
    //     await weth.mint(users[i], sendAmount);
    // }

    console.log("Done.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
