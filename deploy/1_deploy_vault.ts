import {DeployFunction} from "hardhat-deploy/types";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {getDeployByChainIdAndName, getNativeNameByChainId} from "../helpers/chains";
import {errors} from "../helpers/errors";
import {AddressZero, expandDecimals} from "../helpers/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute} = deployments;
    const {owner, tokenManager, mintReceiver} = await getNamedAccounts();
    const chainId = await getChainId();


    // const Vault = await deploy("Vault", {
    //     from: owner,
    //     args: [],
    //     log: true,
    // });
};
export default func;
func.tags = ["vault"];
