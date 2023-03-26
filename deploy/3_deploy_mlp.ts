import {DeployFunction} from "hardhat-deploy/types";
import {AddressZero} from "../helpers/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, get, execute} = deployments;
    const {owner} = await getNamedAccounts();

    // const Vault = await get("Vault");

};
export default func;
func.tags = ["mlp"];
