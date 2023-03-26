import {DeployFunction} from "hardhat-deploy/types";
import {AddressZero} from "../helpers/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, get, execute} = deployments;
    const {owner} = await getNamedAccounts();

    const Vault = await get("Vault");
    const USDM = await get("USDM");
    const WNative = await get("WNative");
    const MLP = await deploy("MLP", {
        from: owner,
        args: [],
        log: true,
    });
    const MlpManager = await deploy("MlpManager", {
        from: owner,
        args: [Vault.address, USDM.address, MLP.address, AddressZero, 0], // TODO K
        log: true,
    });
    const GMX = await deploy("GMX", {
        from: owner,
        args: [],
        log: true,
    });
    const RewardRouter = await deploy("RewardRouter", {
        contract: "RewardRouterV2",
        from: owner,
        args: [],
        log: true,
    });
    const reader = await deploy("Reader", {
        from: owner,
        args: [],
        log: true,
    });
    const vaultReader = await deploy("VaultReader", {
        from: owner,
        args: [],
        log: true,
    });

    await execute("MLP", {from: owner}, "setMinter", MlpManager.address, true);
    await execute("RewardRouter", {from: owner}, "initialize", WNative.address, GMX.address, AddressZero, AddressZero, MLP.address, AddressZero, AddressZero, AddressZero, AddressZero, AddressZero, MlpManager.address, AddressZero, AddressZero);
    await execute("MlpManager", {from: owner}, "setHandler", RewardRouter.address, true);
    await execute("USDM", {from: owner}, "addVault", MlpManager.address);
};
export default func;
func.tags = ["mlp"];
