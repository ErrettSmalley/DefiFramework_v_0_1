import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {ethers} from "hardhat";
import {getDaiConfig, getWethConfig, getWmaticConfig} from "../helpers/params";
import {errors} from "../helpers/errors";

describe("DistinctNativeToken", async () => {

    let vault: any,
        router: any,
        vaultPriceFeed: any,
        orderBook: any,
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
        wnative: any,
        usdm: any

    async function deployContract(name, args) {
        const contractFactory = await ethers.getContractFactory(name)
        return await contractFactory.deploy(...args)
    }

    beforeEach(async () => {
        let fixture = await setupFixture();
        // vault = fixture.vault;
        vaultPriceFeed = fixture.vaultPriceFeed;
        orderBook = fixture.orderBook;
        timelock = fixture.timelock;
        wnative = fixture.weth;
        dai = fixture.dai;
        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
        positionKeeper = fixture.positionKeeper;
        // positionManager = fixture.positionManager;
        wethPriceFeed = fixture.wethPriceFeed;
        reader = fixture.reader;
        // usdm = fixture.usdm;

        vault = await deployContract("Vault", []);
        usdm = await deployContract("USDM", [vault.address]);
        router = await deployContract("Router", [vault.address, usdm.address, wnative.address]);
        await vault.initialize(
            router.address,
            usdm.address,
            vaultPriceFeed.address,
            parseUnits("5", 30), // liquidationFeeUsd, decimals = 30
            100, // fundingRateFactor 1 / 10000
            100 // stableFundingRateFactor 1 / 10000
        )
        const vaultUtils = await deployContract("VaultUtils", [vault.address]);
        const vaultErrorController = fixture.vaultErrorController;
        await vault.setVaultUtils(vaultUtils.address);
        await vault.setErrorController(vaultErrorController.address);
        await vaultErrorController.setErrors(vault.address, errors);

        const shortsTracker = await deployContract("ShortsTracker", [vault.address]);
        positionManager = await deployContract("PositionManager", [vault.address, router.address, shortsTracker.address, wnative.address, 50, orderBook.address]);
        await shortsTracker.setIsGlobalShortDataReady(true)
        await shortsTracker.setHandler(positionManager.address, true);
        await positionManager.setOpened(true);
        await router.addPlugin(positionManager.address);
        await timelock.setContractHandler(positionManager.address, true);

        // wnative
        const priceFeedWNative = await deployContract("PriceFeed", []);
        await priceFeedWNative.setLatestAnswer(toChainlinkPrice(2));
        await vaultPriceFeed.setTokenConfig(wnative.address, priceFeedWNative.address, 8, false)
        await vault.setTokenConfig(...getWmaticConfig(wnative));

        // weth
        weth = await deployContract("Token", ["WETH", 18, parseEther("100000000"), parseEther("1")]);
        const priceFeedWeth = await deployContract("PriceFeed", []);
        await priceFeedWeth.setLatestAnswer(toChainlinkPrice(1500));
        await vaultPriceFeed.setTokenConfig(weth.address, priceFeedWeth.address, 8, false)
        await vault.setTokenConfig(...getWethConfig(weth));

        // dai
        dai = await deployContract("Token", ["DAI", 18, parseEther("100000000"), parseEther("10000")]);
        const priceFeedDai = await deployContract("PriceFeed", []);
        await priceFeedDai.setLatestAnswer(toChainlinkPrice(1));
        await vaultPriceFeed.setTokenConfig(dai.address, priceFeedDai.address, 8, false)
        await vault.setTokenConfig(...getDaiConfig(dai));

        // gov
        await vault.setGov(timelock.address);

        await wnative.mint(vault.address, parseEther("1000"));
        await vault.buyUSDM(wnative.address, user1.address);
        await weth.mint(vault.address, parseEther("100"));
        await vault.buyUSDM(weth.address, user1.address);
        await dai.mint(vault.address, parseEther("20000"));
        await vault.buyUSDM(dai.address, user1.address);
        await router.connect(user0).approvePlugin(positionManager.address);
    })

    it("weth", async () => {
        console.log("hello world");
    });
});