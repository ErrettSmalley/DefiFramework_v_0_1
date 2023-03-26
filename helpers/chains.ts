import {deployments, ethers, getNamedAccounts} from "hardhat";
import {parseEther} from "ethers/lib/utils";
import {
    PRICE_FEED_BTC_MUMBAI,
    PRICE_FEED_DAI_MUMBAI,
    PRICE_FEED_ETH_MUMBAI,
    PRICE_FEED_MATIC_MUMBAI
} from "./constants";

const {deploy, execute} = deployments;

// chain ids
export const CHAIN_ID_LOCAL = "31337";
export const CHAIN_ID_MUMBAI = "80001";

// distinct native token chain ids (not eth)
export const DISTINCT_CHAIN_IDS = [
    CHAIN_ID_MUMBAI,
];

export const getNativeNameByChainId = (chainId: string) => {
    if (chainId == CHAIN_ID_MUMBAI)
        return "WMatic";
    else
        return "WETH";
}

export const getDeployByChainIdAndName = async (chainId: string, deployName: string, contractName: string, args: any[]) => {

    const {owner} = await getNamedAccounts();

    let result;
    if (chainId == CHAIN_ID_LOCAL) {
        const deployed = await deploy(deployName, {
            contract: contractName,
            from: owner,
            args: args,
            log: true,
        });
        result = await ethers.getContractAt(contractName, deployed.address);

        if (deployName == "WNative") {
            const {miner} = await getNamedAccounts();
            await execute("WNative", {from: miner, value: parseEther("100")}, "deposit"); // deposit eth in case withdraw
        }
    } else if (chainId == CHAIN_ID_MUMBAI) {
        let addr = "";
        switch (deployName) {
            case "WNativePriceFeed":
                addr = PRICE_FEED_MATIC_MUMBAI;
                break;
            case "WethPriceFeed":
                addr = PRICE_FEED_ETH_MUMBAI;
                break;
            case "DaiPriceFeed":
                addr = PRICE_FEED_DAI_MUMBAI;
                break;
            case "WbtcPriceFeed":
                addr = PRICE_FEED_BTC_MUMBAI;
        }
        if (addr != "")
            return await ethers.getContractAt(contractName, addr);

        const deployed = await deploy(deployName, {
            contract: contractName,
            from: owner,
            args: args,
            log: true,
        });
        result = await ethers.getContractAt(contractName, deployed.address);
    }

    if (!result)
        throw new Error("getDeployByChainIdAndName Wrong!");
    return result;
};
