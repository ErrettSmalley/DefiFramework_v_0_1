import {DeployFunction} from "hardhat-deploy/types";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {getDeployByChainIdAndName, getNativeNameByChainId} from "../helpers/chains";
import {errors} from "../helpers/errors";
import {AddressZero, expandDecimals} from "../helpers/utils";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute} = deployments;
    const {owner, tokenManager, mintReceiver} = await getNamedAccounts();
    const chainId = await getChainId();

    console.log(">> starting deploying on chainId:", chainId);
    console.log(">> deploying vault...");

    const Vault = await deploy("Vault", {
        from: owner,
        args: [],
        log: true,
    });

    console.log(`Vault.address: ${Vault.address}`);

    const USDM = await deploy("USDM", {
        from: owner,
        args: [Vault.address],
        log: true,
    });

    console.log(`USDM.address: ${USDM.address}`);

    const nativeName = getNativeNameByChainId(chainId);
    console.log("deploying native token:", nativeName);
    const WNative = await getDeployByChainIdAndName(chainId, "WNative", "Token", [nativeName, 18, parseEther("100000000"), parseEther("10000")]);

    console.log(`WNative.address: ${WNative.address}`);

    const Router = await deploy("Router", {
        from: owner,
        args: [Vault.address, USDM.address, WNative.address],
        log: true,
    });

    console.log(`Router.address: ${Router.address}`);

    const VaultPriceFeed = await deploy("VaultPriceFeed", {
        from: owner,
        args: [],
        log: true,
    });

    console.log(`VaultPriceFeed.address: ${VaultPriceFeed.address}`);

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

    console.log(">> deploy vault utils...");

    const VaultUtils = await deploy("VaultUtils", {
        from: owner,
        args: [Vault.address],
        log: true,
    });

    console.log(`VaultUtils.address: ${VaultUtils.address}`);

    const VaultErrorController = await deploy("VaultErrorController", {
        from: owner,
        args: [],
        log: true,
    });

    console.log(`VaultErrorController.address: ${VaultErrorController.address}`);

    console.log(">> vault setting...");
    await execute("Vault", {from: owner}, "initialize",
        Router.address,
        USDM.address,
        VaultPriceFeed.address,
        parseUnits("5", 30), // liquidationFeeUsd, decimals = 30
        100, // fundingRateFactor 1 / 10000
        100 // stableFundingRateFactor 1 / 10000
    );

    await execute("Vault", {from: owner}, "setVaultUtils", VaultUtils.address);
    await execute("Vault", {from: owner}, "setErrorController", VaultErrorController.address);
    await execute("VaultErrorController", {from: owner}, "setErrors", Vault.address, errors);

};
export default func;
func.tags = ["vault"];
