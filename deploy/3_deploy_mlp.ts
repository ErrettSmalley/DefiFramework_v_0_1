import {DeployFunction} from "hardhat-deploy/types";
import {AddressZero} from "../helpers/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, get, execute} = deployments;
    const {owner} = await getNamedAccounts();
    const copilotA = await get("CopilotA");
    console.log(`copilotA: ${copilotA.address}`);
};
export default func;
func.tags = ["mlp"];
