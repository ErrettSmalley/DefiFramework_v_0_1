import {ApproveAmount, getContracts, toChainlinkPrice} from "../helpers/utils";
import {parseEther} from "ethers/lib/utils";
import {BASIS_POINTS_DIVISOR} from "../helpers/constants";

async function main() {

    const {
        router,
        timelock,
        positionManager,
        wethPriceFeed,
        weth,
        vault,
        user1,
        owner,
        dai,
        rewardRouter,
        mlpManager
    } = await getContracts();

    // await weth.mint(vault.address, parseEther("30"));
    // await vault.buyUSDM(weth.address, user1.address);
    // await dai.mint(vault.address, parseEther("50000"));
    // await vault.buyUSDM(dai.address, user1.address);

    await timelock.setMaxLeverage(vault.address, 100 * BASIS_POINTS_DIVISOR);
    await timelock.setFundingRate(vault.address, 60, 10000, 10000);
    
    // let ethAmountIn = parseEther("30");
    // await rewardRouter.connect(user1).mintAndStakeMlpETH(0, 0, {value: ethAmountIn});
    // let daiAmountIn = parseEther("50000");
    // await dai.mint(user1.address, daiAmountIn);
    // await dai.connect(user1).approve(mlpManager.address, ApproveAmount);
    // await rewardRouter.connect(user1).mintAndStakeMlp(dai.address, daiAmountIn, 0, 0);

    let users = [
        "0x1df7121c6543888F0f7EcD3C07Ef5A265260c48D", // long
        "0x9B6B26Db5F9149F0e3f4DAF2Eb98307020236dDB", // k
        "0x37A008Be830CEd0662f52E8fac4ac6c6240DC2c9" // cj
    ]

    for (let i = 0; i < users.length; i++) {
        await owner.sendTransaction({
            to: users[i],
            value: parseEther("100")
        })
    }

    await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1500));
    await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1504));
    await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1499));

    console.log("Done.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
