import {DeployFunction} from "hardhat-deploy/types";
import {CHAIN_ID_LOCAL, CHAIN_ID_MUMBAI, DISTINCT_CHAIN_IDS, getDeployByChainIdAndName} from "../helpers/chains";
import {getDaiConfig, getWbtcConfig, getWethConfig, getWNativeConfigByChainId} from "../helpers/params";
import {toChainlinkPrice} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {execute, get} = deployments;
    const {owner} = await getNamedAccounts();
    const chainId = await getChainId();

};
export default func;
func.tags = ["tokens"];
