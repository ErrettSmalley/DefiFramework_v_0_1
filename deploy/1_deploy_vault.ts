import {DeployFunction} from "hardhat-deploy/types";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {getDeployByChainIdAndName, getNativeNameByChainId} from "../helpers/chains";
import {errors} from "../helpers/errors";
import {AddressZero, expandDecimals} from "../helpers/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute} = deployments;
    const {owner, tokenManager, mintReceiver} = await getNamedAccounts();
    const chainId = await getChainId();


    const mockA = await deploy("MockA", {
        from: owner,
        args: [parseEther("1000000")],
        log: true,
    });

    const CopilotA = await deploy("CopilotA", {
        from: owner,
        args: [mockA.address],
        log: true,
    });
};
export default func;
func.tags = ["vault"];
