import {newWallet, setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {constants} from "ethers";
import {MAX_WITHIN} from "../helpers/constants";
import {ethers} from "hardhat";

describe("MLP", async () => {

    let vault: any,
        router: any,
        r: any,
        timelock: any,
        weth: any,
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
        vaultReader: any,
        mlp: any,
        mlpManager: any,
        mm: any,
        rewardRouter: any,
        vaultUtils: any

    beforeEach(async () => {
        let fixture = await setupFixture();
        vault = fixture.vault;
        router = fixture.router;
        r = fixture.router;
        timelock = fixture.timelock;
        weth = fixture.weth;
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
        vaultReader = fixture.vaultReader;
        mlp = fixture.mlp;
        mlpManager = fixture.mlpManager;
        mm = fixture.mlpManager;
        rewardRouter = fixture.rewardRouter;
        vaultUtils = fixture.vaultUtils;
        
        await router.addPlugin(positionManager.address)
        await timelock.setContractHandler(positionManager.address, true)
        await timelock.setShouldToggleIsLeverageEnabled(true)
        await router.connect(user0).approvePlugin(positionManager.address);
    })
    it("r.func => setGov()", async () => {
        await r.setGov(constants.AddressZero);
        await expect(r.connect(user2).setGov(constants.AddressZero)).reverted;
    });

    it("r.func => addPlugin()", async () => {
        await r.addPlugin(pm.address);
        await expect(r.connect(user2).addPlugin(pm.address)).reverted;

        await r.removePlugin(pm.address);
        await expect(r.connect(user2).removePlugin(pm.address)).reverted;
    });

    it("r.func => approvePlugin()", async () => {
        await r.approvePlugin(pm.address);
        await r.denyPlugin(pm.address);
    });

    it("r.func => pluginTransfer()", async () => {
        await r.addPlugin(pm.address);
        await r.addPlugin(owner.address);
        await r.addPlugin(user0.address);
        await r.connect(user0).approvePlugin(user0.address);

        await dai.mint(user0.address, parseEther("100"));
        await dai.connect(user0).approve(user2.address, parseEther("1000000"));
        await dai.connect(user0).approve(r.address, parseEther("1000000"));

        await r.connect(user0).pluginTransfer(dai.address, user0.address, user2.address,100);
    });

    it("r.func => pluginTransfer()", async () => {
        await r.addPlugin(user0.address);
        await r.connect(user0).approvePlugin(user0.address);
        await dai.mint(user0.address, parseEther("100"));
        await dai.connect(user0).approve(r.address, parseEther("1000000"));
        await r.connect(user0).pluginTransfer(dai.address, user0.address, user2.address,100);
    });

    it("r.func => pluginTransfer(owner,pm)", async () => {
        await dai.mint(owner.address, parseEther("100"));
        await dai.approve(r.address, parseEther("1000000"));
        await r.addPlugin(owner.address);
        await r.approvePlugin(owner.address);
        await r.pluginTransfer(dai.address, owner.address, pm.address,100);
    });

    it("check long position - Decrease", async () => {
        await weth.mint(vault.address, parseEther("30"));
        await vault.buyUSDM(weth.address, user1.address);
        await router.addPlugin(positionManager.address)
        await router.approvePlugin(positionManager.address);
        await router.addPlugin(owner.address);
        await r.approvePlugin(owner.address);
        let params = [[weth.address], weth.address, 0, toUsd(15000), true, toUsd(1500),]
        await positionManager.increasePositionETH(...params, {value: parseEther("1")});
    });
});
 
