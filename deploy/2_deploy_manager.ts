import {DeployFunction} from "hardhat-deploy/types";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute, get} = deployments;
    const {owner} = await getNamedAccounts();
    
    const Vault = await get("Vault");
    const Router = await get("Router");
    const WNative = await get("WNative");
    const ShortsTracker = await deploy("ShortsTracker", {
        from: owner,
        args: [Vault.address],
        log: true,
    });
    const OrderBook = await deploy("OrderBook",{
        from: owner,
        args: [],
        log: true,
    });
    const PositionManager = await deploy("PositionManager", {
        from: owner,
        args: [Vault.address, Router.address, ShortsTracker.address, WNative.address, 50, OrderBook.address],  // 5 / 1000
        log: true,
    });
    await execute("ShortsTracker", {from: owner}, "setIsGlobalShortDataReady", true);
    await execute("ShortsTracker", {from: owner}, "setHandler", PositionManager.address, true);
    await execute("PositionManager", {from: owner}, "setOpened", true);
    await execute("Router", {from: owner}, "addPlugin", PositionManager.address);
    await execute("Timelock", {from: owner}, "setContractHandler", PositionManager.address, true);
    await execute("Timelock", {from: owner}, "setShouldToggleIsLeverageEnabled", true);
};
export default func;
func.tags = ["manager"];
