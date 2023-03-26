import {ApproveAmount, getContracts} from "../helpers/utils";
import {formatEther, formatUnits, parseEther, parseUnits} from "ethers/lib/utils";

async function main() {

    const {owner, router, wnative: wmatic, weth, wbtc, dai,} = await getContracts();

    // approve only once to router
    await dai.approve(router.address, ApproveAmount);
    await router.swap([dai.address, wbtc.address], parseEther("100"), 0, owner.address);
    await router.swap([dai.address, weth.address], parseEther("100"), 0, owner.address);
    await router.swap([dai.address, wmatic.address], parseEther("100"), 0, owner.address);


    await weth.approve(router.address, ApproveAmount);
    await router.swap([weth.address, dai.address], parseEther("0.1"), 0, owner.address);
    await router.swap([weth.address, wbtc.address], parseEther("0.1"), 0, owner.address);
    await router.swap([weth.address, wmatic.address], parseEther("0.1"), 0, owner.address);

    await wbtc.approve(router.address, ApproveAmount);
    await router.swap([wbtc.address, dai.address], parseUnits("0.01",8), 0, owner.address);
    await router.swap([wbtc.address, weth.address], parseUnits("0.01",8), 0, owner.address);
    await router.swap([wbtc.address, wmatic.address], parseUnits("0.01",8), 0, owner.address);

    await wmatic.approve(router.address, ApproveAmount);
    await router.swap([wmatic.address, dai.address], parseEther("100"), 0, owner.address);
    await router.swap([wmatic.address, weth.address], parseEther("100"), 0, owner.address);
    await router.swap([wmatic.address, wbtc.address], parseEther("100"), 0, owner.address);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
