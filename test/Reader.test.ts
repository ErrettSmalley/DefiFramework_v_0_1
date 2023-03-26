import {forwardTime, setupFixture, toUsd} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";

describe("Readers", async () => {

    let vault: any,
        router: any,
        referralStorage: any,
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
        vaultReader: any

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
        reader = fixture.reader;
        vaultReader = fixture.vaultReader;
        
    })

    it("check getVaultTokenInfoV4", async () => {

        await weth.mint(vault.address, parseEther("30"));
        await vault.buyUSDM(weth.address, user1.address);
        let tokens = [weth.address];
        let tokenInfos = await vaultReader.getVaultTokenInfoV4(vault.address, positionManager.address, weth.address, parseUnits("100", 30), tokens);

        expect(tokenInfos[0]).to.eq(parseEther("29.91"));
        // for (let i = 0; i < tokenInfos.length; i++)
        //     console.log("info-" + i + ":", formatEther(tokenInfos[i]));
    })

    it("check getFundingRates", async () => {

        await weth.mint(vault.address, parseEther("100"));
        await vault.buyUSDM(weth.address, user1.address);
        await dai.mint(vault.address, parseEther("50000"));
        await vault.buyUSDM(dai.address, user1.address);
        await router.connect(user0).approvePlugin(positionManager.address);

        await timelock.setFundingRate(vault.address, 60, 100000, 100000);

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

        await forwardTime(600);
        await vault.updateCumulativeFundingRate(weth.address, weth.address);
        // await vault.updateCumulativeFundingRate(weth.address, weth.address);
        
        let _collateralTokens = [weth.address, dai.address];
        const rates = await reader.getFundingRates(vault.address, weth.address, _collateralTokens);
        for (let i = 0; i < rates.length; i++)
            console.log("rate-" + i + ":", rates[i].toNumber());
    })
});
 
