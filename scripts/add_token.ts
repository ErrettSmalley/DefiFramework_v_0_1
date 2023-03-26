import {deployments, ethers, getChainId} from 'hardhat';
import {getContracts, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatUnits, parseEther, parseUnits} from "ethers/lib/utils";
import {PriceFeed} from "../typechain";
import {CHAIN_ID_LOCAL, getDeployByChainIdAndName} from "../helpers/chains";
import {getWbtcConfig} from "../helpers/params";

const {execute, read} = deployments;

async function main() {

    const {owner, positionManager, wnative, weth, dai, timelock, vault} = await getContracts();
    
    const chainId = await getChainId();
    const WBTC = await getDeployByChainIdAndName(chainId, "WBTC", "Token", ["WBTC", 8, parseUnits("1", 8)]);
    const PriceFeedWBTC = await getDeployByChainIdAndName(chainId, "WbtcPriceFeed", "PriceFeed", []);
    await execute("VaultPriceFeed", {from: owner}, "setTokenConfig", WBTC.address, PriceFeedWBTC.address, 8, false);
    
    // let config =  [
    //     vault.address,
    //     WBTC.address, // _token
    //     10000, // _tokenWeight
    //     75, // _minProfitBps
    //     8, // _tokenDecimals
    //     0, // _maxUsdmAmount
    //     false, // _isStable
    //     true // _isShortable
    // ]
    // await execute("Timelock", {from: owner}, "setTokenConfig", ...config);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
