import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {constants} from "ethers";

describe("MLP", async () => {

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
        o: any

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
        mlp = fixture.mlp;
        mlpManager = fixture.mlpManager;
        mm = fixture.mlpManager;
        rewardRouter = fixture.rewardRouter;
        vaultUtils = fixture.vaultUtils;
        o = fixture.orderBook;
        
        await router.addPlugin(positionManager.address)
        await timelock.setContractHandler(positionManager.address, true)
        await timelock.setShouldToggleIsLeverageEnabled(true)
        await router.connect(user0).approvePlugin(positionManager.address);
    })
    it("Orderbook.func => setMinExecutionFee", async () => {
        await o.setMinExecutionFee(0);
        await expect(o.connect(user2).setMinExecutionFee(0)).reverted;

        await o.setMinPurchaseTokenAmountUsd(0);
        await expect(o.connect(user2).setMinPurchaseTokenAmountUsd(0)).reverted;

        await o.setGov(constants.AddressZero);
        await expect(o.connect(user2).setGov(constants.AddressZero)).reverted;
    });

    it("Orderbook.func => getSwapOrder", async () => {
        console.log(`hello world`);
        // console.log(`o.getSwapOrder: ${await o.getSwapOrder(user0.address,0)}`);
        // console.log(`o.getDecreaseOrder: ${await o.getDecreaseOrder(user0.address,0)}`);
        // console.log(`o.getIncreaseOrder: ${await o.getIncreaseOrder(user0.address,0)}`);
    });
});
 
