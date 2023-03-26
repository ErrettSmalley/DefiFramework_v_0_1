import {deployments, ethers, getChainId, network} from "hardhat";
import {
    Vault
} from "../typechain";
import {parseUnits} from "ethers/lib/utils";
import {BigNumber, BigNumberish, ContractTransaction} from "ethers";
import {
    BASIS_POINTS_DIVISOR,
    FUNDING_RATE_PRECISION,
    LIQUIDATION_FEE,
    MARGIN_FEE_BASIS_POINTS,
    MAX_LEVERAGE
} from "./constants";
import {CHAIN_ID_LOCAL} from "./chains";

export const {AddressZero, MaxInt256: ApproveAmount} = ethers.constants

export const setupFixture = deployments.createFixture(async () => {
    await deployments.fixture();
    return getContracts();
});

export async function getContracts() {
    
    const chainId = await getChainId();
    const contracts: any = {
        vault: await ethers.getContract<Vault>("Vault"),
        copilotA: await ethers.getContract("CopilotA"),
        mockA: await ethers.getContract("MockA"),
    };

    let users: any = {
        owner: await ethers.getNamedSigner("owner")
    }
    
    if (chainId == CHAIN_ID_LOCAL) {
        // contracts.wethPriceFeed = await ethers.getContract<PriceFeed>("WethPriceFeed");
        // contracts.daiPriceFeed = await ethers.getContract<PriceFeed>("DaiPriceFeed");
        users.owner = await ethers.getNamedSigner("owner");
        users.user0 = await ethers.getNamedSigner("user0");
        users.user1 = await ethers.getNamedSigner("user1");
        users.user2 = await ethers.getNamedSigner("user2");
        users.user3 = await ethers.getNamedSigner("user3");
        users.user4 = await ethers.getNamedSigner("user4");
        users.positionKeeper = await ethers.getNamedSigner("positionKeeper");
    }
    return {...contracts, ...users};
}

export function newWallet() {
    return ethers.Wallet.createRandom()
}

export function bigNumberify(n: BigNumberish) {
    try {
        return BigNumber.from(n);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("bigNumberify error", e);
        return undefined;
    }
}

export function expandDecimals(n: number, decimals: number) {
    // @ts-ignore
    return bigNumberify(n).mul(bigNumberify(10).pow(decimals))
}

export function toUsd(value: number) {
    return ethers.utils.parseUnits(value.toString(), 30);
}

export function toChainlinkPrice(value: number) {
    return parseUnits(value.toString(), 8)
}

export async function reportGasUsed(provider: any, tx: any, label: any) {
    const {gasUsed} = await provider.getTransactionReceipt(tx.hash)
    console.info(label, gasUsed.toString())
    return gasUsed
}

export const mineBlocks = async (blockNumber: number) => {
    while (blockNumber > 0) {
        blockNumber--;
        await network.provider.send("evm_mine");
    }
}

export async function getBlockTime(provider: any) {
    const blockNumber = await provider.getBlockNumber()
    const block = await provider.getBlock(blockNumber)
    return block.timestamp
}

export async function getGasFee(tx: ContractTransaction) {
    let gas = (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;
    let gasPrice = await ethers.provider.getGasPrice();
    return gas.mul(gasPrice);
}

export const forwardTime = async (seconds: number) => {
    await network.provider.send("evm_increaseTime", [seconds]);
    await network.provider.send("evm_mine");
}

export function getLiqPrice(position: any, cumulativeFundingRate: BigNumber, isLong: boolean) {

    let positionFee = getPositionFee(position.size);
    let fundingFee = getFundingFee(position.size, position.entryFundingRate, cumulativeFundingRate);
    // @ts-ignore
    let marginFee = positionFee.add(fundingFee).add(LIQUIDATION_FEE);
    let marginExceedMaxLeverage = position.size.mul(BASIS_POINTS_DIVISOR).div(MAX_LEVERAGE);

    let liqPriceForFees = getLiqPriceFromSize(marginFee, position.size, position.collateral, position.averagePrice, isLong);
    let liqPriceForMaxLeverage = getLiqPriceFromSize(marginExceedMaxLeverage, position.size, position.collateral, position.averagePrice, isLong);

    // if (liqPriceForFees)
    //     console.log("liqPriceForFees:", formatUnits(liqPriceForFees, 30));
    // if (liqPriceForMaxLeverage)
    //     console.log("liqPriceForMaxLeverage:", formatUnits(liqPriceForMaxLeverage, 30));

    if (!liqPriceForFees)
        return liqPriceForMaxLeverage;

    if (!liqPriceForMaxLeverage)
        return liqPriceForFees;

    if (isLong)// return the higher price
        return liqPriceForFees.gt(liqPriceForMaxLeverage) ? liqPriceForFees : liqPriceForMaxLeverage;

    // return the lower price
    return liqPriceForFees.lt(liqPriceForMaxLeverage) ? liqPriceForFees : liqPriceForMaxLeverage;
}

export function getPositionFee(size: BigNumber) {
    if (!size)
        return bigNumberify(0);
    const afterFeeUsd = size.mul(BASIS_POINTS_DIVISOR - MARGIN_FEE_BASIS_POINTS).div(BASIS_POINTS_DIVISOR);
    return size.sub(afterFeeUsd);
}

export function getFundingFee(size: BigNumber, entryFundingRate: BigNumber, cumulativeFundingRate: BigNumber) {
    if (!entryFundingRate || !cumulativeFundingRate)
        return bigNumberify(0);
    return size.mul(cumulativeFundingRate.sub(entryFundingRate)).div(FUNDING_RATE_PRECISION);
}

export function getLiqPriceFromSize(liqAmount: BigNumber, size: BigNumber, collateral: BigNumber,
                                    averagePrice: BigNumber, isLong: boolean) {
    if (!size || size.eq(0)) {
        return;
    }

    if (liqAmount.gt(collateral))
        throw new Error("getLiqPriceFromSize: position need to be liquidated now!");

    const liquidationDelta = collateral.sub(liqAmount);

    const priceDelta = liquidationDelta.mul(averagePrice).div(size);
    return isLong ? averagePrice.sub(priceDelta) : averagePrice.add(priceDelta);
}
