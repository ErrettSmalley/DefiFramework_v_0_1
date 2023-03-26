import {DeployFunction} from "hardhat-deploy/types";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {getDeployByChainIdAndName, getNativeNameByChainId} from "../helpers/chains";
import {errors} from "../helpers/errors";
import {AddressZero, expandDecimals} from "../helpers/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute} = deployments;
    const {owner, tokenManager, mintReceiver} = await getNamedAccounts();
    const chainId = await getChainId();
    const Vault = await deploy("Vault", {
        from: owner,
        args: [],
        log: true,
    });
    const USDM = await deploy("USDM", {
        from: owner,
        args: [Vault.address],
        log: true,
    });
    const nativeName = getNativeNameByChainId(chainId);
    const WNative = await getDeployByChainIdAndName(chainId, "WNative", "Token", [nativeName, 18, parseEther("100000000"), parseEther("10000")]);
    const Router = await deploy("Router", {
        from: owner,
        args: [Vault.address, USDM.address, WNative.address],
        log: true,
    });
    const VaultPriceFeed = await deploy("VaultPriceFeed", {
        from: owner,
        args: [],
        log: true,
    });
    await deploy("Timelock", {
        from: owner,
        args: [
            owner,
            5 * 24 * 60 * 60,
            AddressZero,
            owner,
            owner,
            expandDecimals(1000, 18),
            10, // marginFeeBasisPoints 0.1%
            500, // maxMarginFeeBasisPoints 5%
        ],
        log: true,
    });
    const VaultUtils = await deploy("VaultUtils", {
        from: owner,
        args: [Vault.address],
        log: true,
    });
    const VaultErrorController = await deploy("VaultErrorController", {
        from: owner,
        args: [],
        log: true,
    });
    await execute("Vault", {from: owner}, "initialize", Router.address, USDM.address, VaultPriceFeed.address, parseUnits("5", 30), 100, 100);
    await execute("Vault", {from: owner}, "setVaultUtils", VaultUtils.address);
    await execute("Vault", {from: owner}, "setErrorController", VaultErrorController.address);
    await execute("VaultErrorController", {from: owner}, "setErrors", Vault.address, errors);

};
export default func;
func.tags = ["vault"];
