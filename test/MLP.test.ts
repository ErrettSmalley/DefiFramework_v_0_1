import {ApproveAmount, newWallet, setupFixture, toUsd} from "../helpers/utils";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {constants, Wallet} from "ethers";
import {ethers} from "hardhat";

describe("MLP", async () => {

    let vault: any,
        router: any,
        timelock: any,
        weth: any,
        wbtc: any,
        dai: any,
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        positionKeeper: any,
        positionManager: any,
        wethPriceFeed: any,
        reader: any,
        vaultReader: any,
        mlp: any,
        mlpManager: any,
        mm: any,
        rewardRouter: any,
        vaultUtils: any,
        wnative: any

    beforeEach(async () => {
        let fixture = await setupFixture();
        vault = fixture.vault;
        router = fixture.router;
        timelock = fixture.timelock;
        weth = fixture.weth;
        wbtc = fixture.wbtc;
        dai = fixture.dai;
        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
        positionKeeper = fixture.positionKeeper;
        positionManager = fixture.positionManager;
        wethPriceFeed = fixture.wethPriceFeed;
        reader = fixture.reader;
        vaultReader = fixture.vaultReader;
        mlp = fixture.mlp;
        mlpManager = fixture.mlpManager;
        mm = fixture.mlpManager;
        rewardRouter = fixture.rewardRouter;
        vaultUtils = fixture.vaultUtils;
        wnative = fixture.wnative;

        await router.addPlugin(positionManager.address)
        await timelock.setContractHandler(positionManager.address, true)
        await timelock.setShouldToggleIsLeverageEnabled(true)
        await router.connect(user0).approvePlugin(positionManager.address);
    })

    it("check token names", async () => {
        expect(await wnative.name()).to.eq("WETH");
        expect(await wnative.symbol()).to.eq("WETH");
        expect(await weth.name()).to.eq("WETH");
        expect(await weth.symbol()).to.eq("WETH");
        expect(await dai.name()).to.eq("DAI");
        expect(await dai.symbol()).to.eq("DAI");
        expect(wnative.address).to.eq(weth.address);
    })

    it("check token faucet", async () => {
        let amount = await weth.faucetAmount();
        await weth.connect(user2).faucet();
        expect(await weth.balanceOf(user2.address)).to.eq(amount);
        await dai.connect(user2).faucet();
        expect(await dai.balanceOf(user2.address)).to.eq(amount);
        await wbtc.connect(user2).faucet();
        expect(await wbtc.balanceOf(user2.address)).to.eq(parseUnits("1", 8));
        await dai.setInterval(30);
        expect(await dai.interval()).to.eq(30);
    })

    it("check buy mlp and open position", async () => {

        // buy mlp, add liquidity
        expect(await vault.poolAmounts(weth.address)).to.eq(0);
        let ethAmountIn = parseEther("1");
        await rewardRouter.connect(user0).mintAndStakeMlpETH(0, 0, {value: ethAmountIn});
        expect(await mlp.balanceOf(user0.address)).to.eq(parseEther("1495.5"));

        let feeBasisPoints = await vaultUtils.getBuyUsdmFeeBasisPoints(weth.address, parseEther("1500"));
        // console.log("BuyUsdmFee:", feeBasisPoints.toNumber()); 0.003
        let fee = ethAmountIn.mul(feeBasisPoints).div(10000); // 0.997
        expect(await vault.poolAmounts(weth.address)).to.eq(ethAmountIn.sub(fee));

        // open long position
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(1000), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("0.1")});
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);

        // check position
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("1000", 30));
        await expect(await position.collateral).to.eq(parseUnits("149", 30));
    })

    it("check mint & redeem mlp with ether", async () => {

        let ethAmountIn = parseEther("1");
        await rewardRouter.connect(user0).mintAndStakeMlpETH(0, 0, {value: ethAmountIn});
        expect(await mlp.balanceOf(user0.address)).to.eq(parseEther("1495.5"));

        let receiver = newWallet();
        await rewardRouter.connect(user0).unstakeAndRedeemMlpETH(parseEther("1495.5"), 0, receiver.address);
        let balance = await ethers.provider.getBalance(receiver.address);
        expect(balance).to.eq(parseEther("0.994009"));
    })

    it("check mint & redeem mlp with token", async () => {

        let daiAmountIn = parseEther("1500");
        await dai.mint(user0.address, daiAmountIn);
        await dai.connect(user0).approve(mlpManager.address, ApproveAmount);
        await rewardRouter.connect(user0).mintAndStakeMlp(dai.address, daiAmountIn, 0, 0);
        expect(await mlp.balanceOf(user0.address)).to.eq(parseEther("1495.5"));
        
        let receiver = newWallet();
        await rewardRouter.connect(user0).unstakeAndRedeemMlp(dai.address, parseEther("1495.5"), 0, receiver.address);
        let balance = await dai.balanceOf(receiver.address);
        expect(balance).to.eq(parseEther("1491.0135"));
    })

//    Added by Prigogine@20230307
    it("RewardRouterV2.func => mintAndStakeMlpETH()", async () => {
        let ethAmountIn = parseEther("1");
        await rewardRouter.connect(user0).mintAndStakeMlpETH(0, 0, {value: ethAmountIn});
    });

    //    Added by Prigogine@20230308
    it("MlpManager.func => setInPrivateMode()", async () => {
        await mm.setInPrivateMode(true);
        await expect(mm.connect(user2).setInPrivateMode(true)).to.be.reverted;

        await mm.setShortsTrackerAveragePriceWeight(0);
        await expect(mm.connect(user2).setShortsTrackerAveragePriceWeight(0)).to.be.reverted;

        await mm.setHandler(constants.AddressZero, true);
        await expect(mm.connect(user2).setHandler(constants.AddressZero, true)).to.be.reverted;

        await mm.setCooldownDuration(0);
        await expect(mm.connect(user2).setCooldownDuration(0)).reverted;

        await mm.setAumAdjustment(0, 0);
        await expect(mm.connect(user2).setAumAdjustment(0, 0)).reverted;
    });

    it("MlpManager.func => addLiquidity(weth)", async () => {
        await weth.mint(owner.address, parseEther("1"));
        await weth.approve(mm.address, parseEther("1000000"));
        await mm.addLiquidity(weth.address, 100, 1, 1);
    });

    it("MlpManager.func => addLiquidity(dai)", async () => {
        await dai.mint(owner.address, parseEther("100"));
        await dai.approve(mm.address, parseEther("1000000"));
        await mm.addLiquidity(dai.address, 100, 1, 1);

        await mm.setHandler(owner.address, true);
        await mm.addLiquidityForAccount(owner.address, owner.address, dai.address, 100, 1, 1);
    });

    it("MlpManager.func => removeLiquidity(dai)", async () => {
        await dai.mint(owner.address, parseEther("100"));
        await dai.approve(mm.address, parseEther("1000000"));
        await mm.addLiquidity(dai.address, parseEther("1"), 1, 1);
        await mm.setCooldownDuration(0);
        await mm.setHandler(owner.address, true);

        await mm.removeLiquidity(dai.address, 100, 1, owner.address);
        await mm.removeLiquidityForAccount(owner.address, dai.address, 100, 1, owner.address);
    });

    it("MlpManager.func => removeLiquidity(dai)", async () => {
        // console.log(`mm.getAums: ${await mm.getAums()}`);

        console.log(`mm.getAumInUsdm: ${await mm.getAumInUsdm(true)}`);
        console.log(`mm.getAumInUsdm: ${await mm.getAumInUsdm(false)}`);

        console.log(`mm.getAum: ${await mm.getAum(true)}`);
        console.log(`mm.getAum: ${await mm.getAum(false)}`);

        console.log(`mm.getGlobalShortAveragePrice: ${await mm.getGlobalShortAveragePrice(dai.address)}`);
        console.log(`mm.getGlobalShortAveragePrice: ${await mm.getGlobalShortAveragePrice(weth.address)}`);

    });
});
 
