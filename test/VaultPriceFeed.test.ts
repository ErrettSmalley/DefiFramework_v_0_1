import {forwardTime, setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {constants} from "ethers";
import {getWNativeConfigByChainId} from "../helpers/params";

describe("VaultPriceFeed", async () => {

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
        wethPriceFeed: any,
        reader: any,
        vaultReader: any,
        mlp: any,
        mlpManager: any,
        mm: any,
        rewardRouter: any,
        vaultUtils: any,
        o: any,
        v: any,
        usdm: any,
        vp: any

    beforeEach(async () => {
        let fixture = await setupFixture();
        vault = fixture.vault;
        router = fixture.router;
        timelock = fixture.timelock;
        weth = fixture.weth;
        dai = fixture.dai;
        usdm = fixture.usdm;
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
        o = fixture.orderBook;
        v = fixture.vault;
        vp = fixture.vaultPriceFeed;
        
        await router.addPlugin(positionManager.address)
        await timelock.setContractHandler(positionManager.address, true)
        await timelock.setShouldToggleIsLeverageEnabled(true)
        await router.connect(user0).approvePlugin(positionManager.address);
    })
    it("vp.func => setGov", async () => {
        await vp.setGov(owner.address);
        await vp.setChainlinkFlags(constants.AddressZero);
        await vp.setAdjustment(dai.address,true,0);
        await vp.setUseV2Pricing(true);
        await vp.setIsAmmEnabled(true);

        await vp.setIsSecondaryPriceEnabled(true);
        await vp.setSecondaryPriceFeed(constants.AddressZero);
        await vp.setTokens(constants.AddressZero, constants.AddressZero, constants.AddressZero);
        await vp.setPairs(constants.AddressZero, constants.AddressZero, constants.AddressZero);
        await vp.setSpreadBasisPoints(dai.address,0);

        await vp.setSpreadThresholdBasisPoints(0);
        await vp.setFavorPrimaryPrice(true);
        await vp.setPriceSampleSpace(4);
        await vp.setMaxStrictPriceDeviation(0);
        await vp.setTokenConfig(dai.address,constants.AddressZero,18,true);
    });

    it("vp.func => setGov", async () => {
        console.log(`vp.getPrice: ${await vp.getPrice(dai.address, true,true,true)}`);
        console.log(`vp.getPrice: ${await vp.getPrice(weth.address, true,true,true)}`);

        console.log(`vp.getPriceV1: ${await vp.getPriceV1(dai.address, true,true)}`);
        console.log(`vp.getPriceV2: ${await vp.getPriceV2(dai.address, true,true)}`);

        console.log(`vp.getAmmPriceV2: ${await vp.getAmmPriceV2(dai.address, true,parseEther("1"))}`);

        console.log(`vp.getLatestPrimaryPrice: ${await vp.getLatestPrimaryPrice(dai.address)}`);

        console.log(`vp.getPrimaryPrice: ${await vp.getPrimaryPrice(dai.address,true)}`);

        console.log(`vp.getSecondaryPrice: ${await vp.getSecondaryPrice(dai.address,parseEther("1"),true)}`);

        console.log(`vp.getAmmPrice: ${await vp.getAmmPrice(dai.address)}`);
    });
});
 
