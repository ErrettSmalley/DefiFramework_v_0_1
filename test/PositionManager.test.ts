import {
    ApproveAmount,
    changeMarkPrice,
    forwardTime,
    getGasFee,
    getLiqPrice,
    newWallet,
    setupFixture,
    toChainlinkPrice,
    toUsd
} from "../helpers/utils";
import {formatEther, formatUnits, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {MAX_WITHIN} from "../helpers/constants";
import {ethers} from "hardhat";
import {constants} from "ethers";

async function longWithProfit(weth: any, positionManager: any, user0: any, wethPriceFeed: any) {
    let params = [[weth.address], weth.address, 0, toUsd(9000), true, toUsd(1500),];
    await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("2.3456789")});
    await changeMarkPrice(wethPriceFeed, 1600);
    let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(9000), true, user0.address, toUsd(1550), toUsd(0), true];
    await positionManager.connect(user0).decreasePosition(...paramsDe);
}

describe("PositionManager", async () => {

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
        pm: any,
        wethPriceFeed: any,
        reader: any,
        v: any

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
        pm = fixture.positionManager;
        wethPriceFeed = fixture.wethPriceFeed;
        reader = fixture.reader;
        v = fixture.vault;

        await weth.mint(vault.address, parseEther("100"));
        await vault.buyUSDM(weth.address, user1.address);
        await dai.mint(vault.address, parseEther("200000"));
        await vault.buyUSDM(dai.address, user1.address);
        await wbtc.mint(vault.address, parseUnits("10", 8));
        await vault.buyUSDM(wbtc.address, user1.address);
        await router.connect(user0).approvePlugin(positionManager.address);
    })

    it("check long position - Open", async () => {
        // open
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(15000), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("1")});
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);

        // check position
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1485", 30)); // - 0.1% positionFee
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("10"));
    })

    it("check long position - Close with profit", async () => {
        // open
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(15000), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]

        let amountIn = parseEther("1");
        await positionManager.connect(user0).increasePositionETH(...params, {value: amountIn});
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1485", 30)); // - 0.1% positionFee
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("10"));

        let userBalanceBefore = await ethers.provider.getBalance(user0.address);

        // price up
        await changeMarkPrice(wethPriceFeed, 1600);

        // close all
        let paramsDe = [
            [weth.address], // _path
            weth.address, // _indexToken
            toUsd(0), // _collateralDelta
            toUsd(15000), // _sizeDelta
            true, // _isLong
            user0.address,  // _receiver
            toUsd(1550),  // _price
            toUsd(0), // _minOut
            true // _withdrawETH
        ]
        let tx = await positionManager.connect(user0).decreasePosition(...paramsDe);
        let gasFee = await getGasFee(tx);
        let userBalanceAfter = await ethers.provider.getBalance(user0.address);
        let profit = userBalanceAfter.add(gasFee).sub(userBalanceBefore).sub(amountIn);
        expect(profit).to.be.closeTo(parseEther("0.54375"), MAX_WITHIN); // (1500 - 30 + 1000) / 1600 - 1

        // expect user position deleted
        position = await vault.positions(key);
        await expect(await position.size).to.eq(0);
        await expect(await position.collateral).to.eq(0);
    })

    it("check long position - Close with loss", async () => {
        // open
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(15000), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]

        let amountIn = parseEther("1");
        await positionManager.connect(user0).increasePositionETH(...params, {value: amountIn});
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1485", 30)); // - 0.1% positionFee
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("10"));

        let userBalanceBefore = await ethers.provider.getBalance(user0.address);

        // price down
        await changeMarkPrice(wethPriceFeed, 1400);

        // close all
        let paramsDe = [
            [weth.address], // _path
            weth.address, // _indexToken
            toUsd(0), // _collateralDelta
            toUsd(15000), // _sizeDelta
            true, // _isLong
            user0.address,  // _receiver
            toUsd(1400),  // _price
            toUsd(0), // _minOut
            true // _withdrawETH
        ]
        let tx = await positionManager.connect(user0).decreasePosition(...paramsDe);
        let gasFee = await getGasFee(tx);
        let userBalanceAfter = await ethers.provider.getBalance(user0.address);
        let loss = userBalanceAfter.add(gasFee).sub(userBalanceBefore).sub(amountIn);
        expect(loss).to.be.closeTo(parseEther("-0.66428"), MAX_WITHIN); // (1500 - 30 - 1000) / 1400 - 1

        // expect user position deleted
        position = await vault.positions(key);
        await expect(await position.size).to.eq(0);
        await expect(await position.collateral).to.eq(0);
    })

    it("check long position - Liquidate", async () => {

        // open
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(15000), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("1")});
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1485", 30));
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("10"));

        let wethBalanceBefore = await weth.balanceOf(user0.address);

        let cumulativeFundingRate = await vault.cumulativeFundingRates(weth.address);
        let liqPrice = getLiqPrice(position, cumulativeFundingRate, true);
        expect(liqPrice).to.eq(parseUnits("1381.5", 30));

        // liquidate
        await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1381.49));  // liqPrice < 1.02 * entryPrice - col * entryPrice / size = 1381.5
        await positionManager.setLiquidator(user1.address, true);
        await positionManager.connect(user1).liquidatePosition(user0.address, weth.address, weth.address, true, user1.address);

        let wethBalanceAfter = await weth.balanceOf(user0.address);
        let wethReceived = wethBalanceAfter.sub(wethBalanceBefore);
        // 1485 - (1500-1381.49) / 1500 * 15000 = 299.9
        // (299.9 - 15) / 1500 = 0.189933
        expect(wethReceived).to.be.closeTo(parseEther("0.189933"), MAX_WITHIN);

        // expect user position deleted
        position = await vault.positions(key);
        await expect(await position.size).to.eq(0);
        await expect(await position.collateral).to.eq(0);
    })

    it("check long position - Liquidate Max leverage 50x", async () => {
        // open
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(71428.57), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("1")});

        // liquidate
        await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1499.9999));
        await positionManager.setLiquidator(user1.address, true);
        await positionManager.connect(user1).liquidatePosition(user0.address, weth.address, weth.address, true, user1.address);
        // expect user position deleted
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(0);
    })

    it("check long position - Decrease", async () => {
        await weth.mint(vault.address, parseEther("30"));
        await vault.buyUSDM(weth.address, user1.address);
        await router.addPlugin(positionManager.address)
        await timelock.setContractHandler(positionManager.address, true)
        await timelock.setShouldToggleIsLeverageEnabled(true)

        await router.connect(user0).approvePlugin(positionManager.address)

        // open
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(15000), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("1")});
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1485", 30)); // - 0.1% positionFee
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("10"));

        // decrease, only size
        let paramsDe = [
            [weth.address], // _path
            weth.address, // _indexToken
            toUsd(0), // _collateralDelta
            toUsd(1000), // _sizeDelta
            true, // _isLong
            user1.address,  // _receiver
            toUsd(1500),  // _price
            toUsd(0), // _minOut
            true // _withdrawETH
        ]
        await positionManager.connect(user0).decreasePosition(...paramsDe);

        // check position
        position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("14000", 30)); // size -
        await expect(await position.collateral).to.eq(parseUnits("1484", 30)); // positionFee - _sizeDelta * 0.1%
        await expect(await position.reserveAmount).to.be.closeTo(parseEther("9.3333"), MAX_WITHIN); // reserveAmount - 1000 / 1500

        // decrease, size & col
        let colReceiver = await newWallet();
        paramsDe[2] = toUsd(100);
        paramsDe[5] = colReceiver.address; // default user0
        await positionManager.connect(user0).decreasePosition(...paramsDe);

        // check position
        position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("13000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1384", 30));
        await expect(await position.reserveAmount).to.be.closeTo(parseEther("8.6666"), MAX_WITHIN);

        let received = await ethers.provider.getBalance(colReceiver.address);
        expect(received).to.eq(parseEther("0.066")); // _collateralDelta - positionFee

    })

    it("check short position - Close with profit", async () => {
        // open
        let daiAmountIn = parseEther("1500");
        let params = [
            [dai.address], // _path
            weth.address, // _indexTokends
            daiAmountIn,
            0, // _minOut
            toUsd(15000), // _sizeDelta
            false, // _isLong
            toUsd(1500), // _acceptablePrice
        ]

        await dai.mint(user0.address, daiAmountIn);
        await dai.connect(user0).approve(router.address, ApproveAmount);
        await positionManager.connect(user0).increasePosition(...params);
        let key = await vault.getPositionKey(user0.address, dai.address, weth.address, false);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1485", 30)); // - 0.1% positionFee
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("15000"));

        // price down
        await changeMarkPrice(wethPriceFeed, 1400);

        // close all
        let paramsDe = [
            [dai.address], // _path
            weth.address, // _indexToken
            toUsd(0), // _collateralDelta
            toUsd(15000), // _sizeDelta
            false, // _isLong
            user1.address,  // _receiver
            toUsd(1450),  // _price
            toUsd(0), // _minOut
            false // _withdrawETH
        ]
        await positionManager.connect(user0).decreasePosition(...paramsDe);
        let profit = await dai.balanceOf(user1.address);
        // expect(profit).to.be.closeTo(parseEther("2470"), MAX_WITHIN); // 1500 - 30 + 1000

        // expect user position deleted
        position = await vault.positions(key);
        await expect(await position.size).to.eq(0);
        await expect(await position.collateral).to.eq(0);
    })

    it("check short position - Liquidate", async () => {

        // open
        let params = [
            [weth.address, dai.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(15000), // _sizeDelta
            false, // _isLong
            toUsd(1500), // _acceptablePrice
        ]
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("1")});
        let key = await vault.getPositionKey(user0.address, dai.address, weth.address, false);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1480.5", 30)); // - marginFee, - swapFee
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("15000"));

        let daiBalanceBefore = await dai.balanceOf(user0.address);

        let cumulativeFundingRate = await vault.cumulativeFundingRates(weth.address);
        let liqPrice = getLiqPrice(position, cumulativeFundingRate, false);
        expect(liqPrice).to.eq(parseUnits("1618.05", 30));

        // liquidate
        await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1618.06));  // liqPrice > (col / size + 0.98) * entryPrice = 1618.05
        await positionManager.setLiquidator(user1.address, true);
        await positionManager.connect(user1).liquidatePosition(user0.address, dai.address, weth.address, false, user1.address);

        let daiBalanceAfter = await dai.balanceOf(user0.address);
        let daiReceived = daiBalanceAfter.sub(daiBalanceBefore);
        // 1480.5 - (1618.06-1500) / 1500 * 15000 - 15 = 284.9
        expect(daiReceived).to.be.closeTo(parseEther("284.9"), MAX_WITHIN);

        // expect user position deleted
        position = await vault.positions(key);
        await expect(await position.size).to.eq(0);
        await expect(await position.collateral).to.eq(0);
    })

    it("check liquidate price for fees", async () => {
        // open
        let params = [
            [weth.address], // _path
            weth.address, // _indexToken
            0, // _minOut
            toUsd(15000), // _sizeDelta
            true, // _isLong
            toUsd(1500), // _acceptablePrice
        ]
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("1")});
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);

        // check position
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("15000", 30));
        await expect(await position.collateral).to.eq(parseUnits("1485", 30)); // - 0.1% positionFee
        await expect(await position.averagePrice).to.eq(parseUnits("1500", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("10"));

        await forwardTime(100 * 24 * 60 * 60); // funding fee 100 days, higher liq price
        await vault.updateCumulativeFundingRate(weth.address, weth.address);
        let cumulativeFundingRate = await vault.cumulativeFundingRates(weth.address);
        // console.log("cumulativeFundingRate now:", cumulativeFundingRate.toNumber());
        // let liqPrice = getLiqPrice(position, cumulativeFundingRate, true);

        // liquidate
        await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1389.2524));  // funding fee 100 days, higher liq price 1389.2525
        // await changeMarkPrice(wethPriceFeed, 1389)
        await positionManager.setLiquidator(user1.address, true);
        await positionManager.connect(user1).liquidatePosition(user0.address, weth.address, weth.address, true, user1.address);
    })

    it("check long position with wbtc", async () => {

        // open
        let daiAmountIn = parseEther("5000");
        let params = [
            [dai.address, wbtc.address], // _path
            wbtc.address, // _indexTokends
            daiAmountIn,
            0, // _minOut
            toUsd(100000), // _sizeDelta
            true, // _isLong
            toUsd(28000), // _acceptablePrice
        ]

        await dai.mint(user0.address, daiAmountIn);
        await dai.connect(user0).approve(router.address, ApproveAmount);
        await positionManager.connect(user0).increasePosition(...params);
        let key = await vault.getPositionKey(user0.address, wbtc.address, wbtc.address, true);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("100000", 30));
        await expect(await position.averagePrice).to.eq(parseUnits("28000", 30));
        await expect(await position.reserveAmount).to.be.closeTo(parseUnits("3.571", 8), MAX_WITHIN);
    });

    it("check short position with wbtc", async () => {

        // open
        let daiAmountIn = parseEther("5000");
        let params = [
            [dai.address], // _path
            wbtc.address, // _indexTokends
            daiAmountIn,
            0, // _minOut
            toUsd(100000), // _sizeDelta
            false, // _isLong
            toUsd(28000), // _acceptablePrice
        ]

        await dai.mint(user0.address, daiAmountIn);
        await dai.connect(user0).approve(router.address, ApproveAmount);
        await positionManager.connect(user0).increasePosition(...params);
        let key = await vault.getPositionKey(user0.address, dai.address, wbtc.address, false);
        let position = await vault.positions(key);
        await expect(await position.size).to.eq(parseUnits("100000", 30));
        await expect(await position.collateral).to.eq(parseUnits("4900", 30));
        await expect(await position.averagePrice).to.eq(parseUnits("28000", 30));
        await expect(await position.reserveAmount).to.eq(parseEther("100000"));
    });

//    added by prigogine @20230306
    it("setGov() - Prigogine", async () => {
        await expect(positionManager.connect(user0).setGov(constants.AddressZero)).to.be.reverted;
        await pm.setGov(constants.AddressZero);
    });
    it("setAdmin() - Prigogine", async () => {
        await expect(positionManager.connect(user0).setAdmin(constants.AddressZero)).to.be.reverted;
        await pm.setAdmin(constants.AddressZero);
    });
    it("setDepositFee() - Prigogine", async () => {
        await pm.setDepositFee(0);
        await pm.setIncreasePositionBufferBps(0);
        await pm.setReferralStorage(constants.AddressZero);
    });

    it("pm.setOrderKeeper() - Prigogine", async () => {
        await pm.setOrderKeeper(user0.address, true);
        await expect(pm.connect(user0).setOrderKeeper(user0.address, true)).to.be.reverted;

        await pm.setLiquidator(user0.address, true);
        await expect(pm.connect(user0).setLiquidator(user0.address, true)).to.be.reverted;

        await pm.setPartner(user0.address, true);
        await expect(pm.connect(user0).setPartner(user0.address, true)).to.be.reverted;

        await pm.setOpened(true);
        await expect(pm.connect(user0).setOpened(true)).to.be.reverted;

        await pm.setShouldValidateIncreaseOrder(true);
        await expect(pm.connect(user0).setShouldValidateIncreaseOrder(true)).to.be.reverted;
    });

    it("bpm.approve() - Prigogine", async () => {
        await pm.approve(dai.address, user2.address, parseEther("1.2345"));
        await expect(pm.connect(user2).approve(dai.address, user0.address, parseEther("1.2345"))).to.be.reverted;

        await pm.withdrawFees(dai.address, user2.address);
        await expect(pm.connect(user2).withdrawFees(dai.address, user2.address)).to.be.reverted;
    });

    /* added by Prigogine @20230314 */
    it("check long position - Close with profit", async () => {
        console.log(`Step0: userBalanceBefore: ${formatEther(await ethers.provider.getBalance(user0.address))}`);
        let params = [[weth.address], weth.address, 0, toUsd(15000), true, toUsd(1500),];
        let amountIn = parseEther("5");
        await positionManager.connect(user0).increasePositionETH(...params, {value: amountIn});
        console.log(`Step1: userBalanceBefore: ${formatEther(await ethers.provider.getBalance(user0.address))}`);

        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        let position = await vault.positions(key);
        let userBalanceBefore = await ethers.provider.getBalance(user0.address);
        console.log(`Step1b: userBalanceBefore: ${formatEther(await ethers.provider.getBalance(user0.address))}`);

        await changeMarkPrice(wethPriceFeed, 1600);
        let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(15000), true, user0.address, toUsd(1550), toUsd(0), true];
        let tx = await positionManager.connect(user0).decreasePosition(...paramsDe);
        let gasFee = await getGasFee(tx);
        let userBalanceAfter = await ethers.provider.getBalance(user0.address);
        let profit = userBalanceAfter.add(gasFee).sub(userBalanceBefore).sub(amountIn);


        console.log(`StepX: userBalanceBefore: ${formatEther(await ethers.provider.getBalance(user0.address))}`);
    });

    it("check long position - Close with profit", async () => {
        console.log(`Step0: v.poolAmounts(weth): ${formatEther(await v.poolAmounts(weth.address))}`);
        let params = [[weth.address], weth.address, 0, toUsd(15000), true, toUsd(1500),];
        let amountIn = parseEther("5");
        await positionManager.connect(user0).increasePositionETH(...params, {value: amountIn});
        console.log(`Step1: v.poolAmounts(weth): ${formatEther(await v.poolAmounts(weth.address))}`);

        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        let position = await vault.positions(key);
        let userBalanceBefore = await ethers.provider.getBalance(user0.address);
        console.log(`Step1b: v.poolAmounts(weth): ${formatEther(await v.poolAmounts(weth.address))}`);

        await changeMarkPrice(wethPriceFeed, 1600);
        let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(15000), true, user0.address, toUsd(1550), toUsd(0), true];
        let tx = await positionManager.connect(user0).decreasePosition(...paramsDe);
        let gasFee = await getGasFee(tx);
        let userBalanceAfter = await ethers.provider.getBalance(user0.address);
        let profit = userBalanceAfter.add(gasFee).sub(userBalanceBefore).sub(amountIn);
        console.log(`Step X: v.poolAmounts(weth): ${formatEther(await v.poolAmounts(weth.address))}`);
    });

    it("long position && close with profit ==> BASE", async () => {
        let params = [[weth.address], weth.address, 0, toUsd(15000), true, toUsd(1500),];
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("5")});

        await changeMarkPrice(wethPriceFeed, 1600);
        let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(15000), true, user0.address, toUsd(1550), toUsd(0), true];
        await positionManager.connect(user0).decreasePosition(...paramsDe);
    });

    it("long position && close with profit ==> position", async () => {
        let key = await vault.getPositionKey(user0.address, weth.address, weth.address, true);
        console.log(`step0: position: ${await vault.positions(key)}`);

        let params = [[weth.address], weth.address, 0, toUsd(15000), true, toUsd(1500),];
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("5")});
        console.log(`step1: position: ${await vault.positions(key)}`);

        await changeMarkPrice(wethPriceFeed, 1600);
        let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(15000), true, user0.address, toUsd(1550), toUsd(0), true];
        await positionManager.connect(user0).decreasePosition(...paramsDe);

        console.log(`stepX: position: ${await vault.positions(key)}`);
    });

    it("long+profit ==> v.poolAmounts", async () => {
        expect(await v.poolAmounts(weth.address)).lt(parseEther("100"));

        let params = [[weth.address], weth.address, 0, toUsd(9000), true, toUsd(1500),];
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("2.3456789")});
        expect(await v.poolAmounts(weth.address)).gt(parseEther("100"));

        await changeMarkPrice(wethPriceFeed, 1600);
        let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(9000), true, user0.address, toUsd(1550), toUsd(0), true];
        await positionManager.connect(user0).decreasePosition(...paramsDe);
        expect(await v.poolAmounts(weth.address)).lt(parseEther("100"));
    });

    it("long+profit ==> v.reservedAmounts", async () => {
        expect(await v.reservedAmounts(weth.address)).eq(0);

        let params = [[weth.address], weth.address, 0, toUsd(9000), true, toUsd(1500),];
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("2.3456789")});
        expect(await v.reservedAmounts(weth.address)).gt(0);

        await changeMarkPrice(wethPriceFeed, 1600);
        let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(9000), true, user0.address, toUsd(1550), toUsd(0), true];
        await positionManager.connect(user0).decreasePosition(...paramsDe);
        expect(await v.reservedAmounts(weth.address)).eq(0);
    });

    it("long+profit ==> v.allWhitelistedTokens", async () => {
        expect(await v.whitelistedTokens(dai.address)).eq(true);
        expect(await v.whitelistedTokens(weth.address)).eq(true);
        expect(await v.allWhitelistedTokensLength()).eq(3);
        expect(await v.allWhitelistedTokens(0)).not.eq(constants.AddressZero);
        expect(await v.allWhitelistedTokens(1)).not.eq(constants.AddressZero);

        let params = [[weth.address], weth.address, 0, toUsd(9000), true, toUsd(1500),];
        await positionManager.connect(user0).increasePositionETH(...params, {value: parseEther("2.3456789")});
        await changeMarkPrice(wethPriceFeed, 1600);
        let paramsDe = [[weth.address], weth.address, toUsd(0), toUsd(9000), true, user0.address, toUsd(1550), toUsd(0), true];
        await positionManager.connect(user0).decreasePosition(...paramsDe);
    });

    it("buyUSDM ==> v.usdmAmounts", async () => {
        let beforeValue = await v.usdmAmounts(weth.address);
        await weth.mint(vault.address, parseEther("300"));
        await vault.buyUSDM(weth.address, user1.address);
        expect(await v.usdmAmounts(weth.address)).gt(beforeValue);
    });

    it("longWithProfit ==> v.maxUsdmAmounts", async () => {
        await longWithProfit(weth, positionManager, user0, wethPriceFeed);
    });

    it("longWithProfit ==> v.tokenDecimals", async () => {
        expect(await v.tokenDecimals(weth.address)).eq(18);
        expect(await v.tokenDecimals(dai.address)).eq(18);
        await longWithProfit(weth, positionManager, user0, wethPriceFeed);
        expect(await v.tokenDecimals(weth.address)).eq(18);
        expect(await v.tokenDecimals(dai.address)).eq(18);
    });

    it("longWithProfit ==> v.tokenBalances", async () => {
        expect(await v.tokenBalances(weth.address)).eq(await weth.balanceOf(v.address));
        await longWithProfit(weth, positionManager, user0, wethPriceFeed);
        expect(await v.tokenBalances(weth.address)).eq(await weth.balanceOf(v.address));
    });

    it("longWithProfit ==> v.tokenWeights", async () => {
        console.log(`v.tokenWeights(weth): ${await v.tokenWeights(weth.address)}`);
        console.log(`v.tokenWeights(dai): ${await v.tokenWeights(dai.address)}`);
        console.log(`v.totalTokenWeights: ${await v.totalTokenWeights()}`);
        await longWithProfit(weth, positionManager, user0, wethPriceFeed);

        console.log(`v.tokenWeights(weth): ${await v.tokenWeights(weth.address)}`);
        console.log(`v.tokenWeights(dai): ${await v.tokenWeights(dai.address)}`);
        console.log(`v.totalTokenWeights: ${await v.totalTokenWeights()}`);
    });


});
 
