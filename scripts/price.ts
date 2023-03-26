import {deployments} from 'hardhat';
import {getContracts, toChainlinkPrice} from "../helpers/utils";

const {execute, read} = deployments;

async function main() {

    const {wethPriceFeed} = await getContracts();

    await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1446.02));
    // await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1617.5));

    // await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1500));
    // await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1504));
    // await wethPriceFeed.setLatestAnswer(toChainlinkPrice(1499));
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
