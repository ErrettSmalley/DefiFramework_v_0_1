import {DeployFunction} from "hardhat-deploy/types";
import {CHAIN_ID_LOCAL, CHAIN_ID_MUMBAI, DISTINCT_CHAIN_IDS, getDeployByChainIdAndName} from "../helpers/chains";
import {getDaiConfig, getWbtcConfig, getWethConfig, getWNativeConfigByChainId} from "../helpers/params";
import {Vault} from "../typechain";
import {toChainlinkPrice} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {execute, get} = deployments;
    const {owner} = await getNamedAccounts();
    const chainId = await getChainId();
    
    let WETH;
    if (DISTINCT_CHAIN_IDS.includes(chainId)) {
        const WNative = await get("WNative");
        const PriceFeedWNative = await getDeployByChainIdAndName(chainId, "WNativePriceFeed", "PriceFeed", []);
        await execute("VaultPriceFeed", {from: owner}, "setTokenConfig", WNative.address, PriceFeedWNative.address, 8, false);
        await execute("Vault", {from: owner}, "setTokenConfig", ...getWNativeConfigByChainId(WNative, chainId));
        WETH = await getDeployByChainIdAndName(chainId, "WETH", "Token", ["WETH", 18, parseEther("100000"), parseEther("10")]);
    } else {
        WETH = await get("WNative");
    }

    // WETH
    const PriceFeedWeth = await getDeployByChainIdAndName(chainId, "WethPriceFeed", "PriceFeed", []);
    if (CHAIN_ID_LOCAL == chainId)
        await PriceFeedWeth.setLatestAnswer(toChainlinkPrice(1500));
    await execute("VaultPriceFeed", {from: owner}, "setTokenConfig", WETH.address, PriceFeedWeth.address, 8, false);
    await execute("Vault", {from: owner}, "setTokenConfig", ...getWethConfig(WETH));

    const WBTC = await getDeployByChainIdAndName(chainId, "WBTC", "Token", ["WBTC", 8, parseUnits("10000", 8), parseUnits("1", 8)]);
    const PriceFeedWBTC = await getDeployByChainIdAndName(chainId, "WbtcPriceFeed", "PriceFeed", []);
    if (CHAIN_ID_LOCAL == chainId)
        await PriceFeedWBTC.setLatestAnswer(toChainlinkPrice(28000));
    await execute("VaultPriceFeed", {from: owner}, "setTokenConfig", WBTC.address, PriceFeedWBTC.address, 8, false);
    await execute("Vault", {from: owner}, "setTokenConfig", ...getWbtcConfig(WBTC));
    const DAI = await getDeployByChainIdAndName(chainId, "DAI", "Token", ["DAI", 18, parseEther("100000000"), parseEther("10000")]);
    const PriceFeedDAI = await getDeployByChainIdAndName(chainId, "DaiPriceFeed", "PriceFeed", []);
    if (CHAIN_ID_LOCAL == chainId)
        await PriceFeedDAI.setLatestAnswer(toChainlinkPrice(1));
    await execute("VaultPriceFeed", {from: owner}, "setTokenConfig", DAI.address, PriceFeedDAI.address, 8, false);
    await execute("Vault", {from: owner}, "setTokenConfig", ...getDaiConfig(DAI));
    const Timelock = await get("Timelock");
    await execute("Vault", {from: owner}, "setGov", Timelock.address);
};
export default func;
func.tags = ["tokens"];
