import {changeMarkPrice, getGasFee, newWallet, setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {MAX_WITHIN} from "../helpers/constants";
import {ethers} from "hardhat";

describe("PositionManager ByPrigogine", async () => {

    let vault: any,
        router: any,
        timelock: any,
        weth: any,
        dai: any,
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        positionKeeper: any,
        positionManager: any,
        wethPriceFeed: any

    beforeEach(async () => {
        let fixture = await setupFixture();
        vault = fixture.vault;
        router = fixture.router;
        timelock = fixture.timelock;
        weth = fixture.weth;
        dai = fixture.dai;
        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
        positionKeeper = fixture.positionKeeper;
        positionManager = fixture.positionManager;
        wethPriceFeed = fixture.wethPriceFeed;

        await weth.mint(vault.address, parseEther("100"));
        await vault.buyUSDM(weth.address, user1.address);
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

        // liquidate
        await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1381.49));  // liqPrice < 1.02 * entryPrice - col * entryPrice / size = 1381.5
        await positionManager.setLiquidator(user1.address, true);
        await positionManager.connect(user1).liquidatePosition(user0.address, weth.address, weth.address, true, user1.address);

        let wethBalanceAfter = await weth.balanceOf(user0.address);
        let wethReceived = wethBalanceAfter.sub(wethBalanceBefore);
        expect(wethReceived).to.be.closeTo(parseEther("0.18933333"), MAX_WITHIN);

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
        
        // console.log("received:", formatEther(received));
        // console.log("size:", formatUnits(position.size, 30));
        // console.log("collateral:", formatUnits(position.collateral, 30));
        // console.log("averagePrice:", formatUnits(position.averagePrice, 30));
        // console.log("entryFuningRate:", position.entryFuningRate);
        // console.log("reserveAmount:", formatEther(position.reserveAmount));
        // console.log("realisedPnl:", formatUnits(position.realisedPnl, 30));
        // console.log("lastIncreasedTime:", position.lastIncreasedTime.toNumber());
    })

    /* added by prigogine @20230218 */
    it("check long position - profit => PART A", async () => {
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
        let userBalanceBefore = await ethers.provider.getBalance(user0.address);
        await changeMarkPrice(wethPriceFeed, 1600);

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

        position = await vault.positions(key);
        await expect(await position.size).to.eq(0);
        await expect(await position.collateral).to.eq(0);

        expect(position.averagePrice).eq(0);
        expect(position.entryFundingRate).eq(0);
        expect(position.reserveAmount).eq(0);
        expect(position.realisedPnl).eq(0);
        expect(position.lastIncreasedTime).eq(0);
    });
});
 
