import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import '@typechain/hardhat';
import {HardhatUserConfig} from 'hardhat/types';
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";

const secret = require("./secret.json");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {
    solidity: {
        version: "0.6.12",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000
            }
        }
    },
    namedAccounts: {
        owner: 0,
        user0: 1,
        user1: 2,
        user2: 3,
        user3: 4,
        user4: 5,
        positionKeeper: 6,
        tokenManager: 7,
        mintReceiver: 8,
        miner: 9
    },
    networks: {
        mumbai: {
            url: secret.url_mumbai,
            accounts: [secret.key_dev],
            timeout: 30000,
        },
        hardhat: {
            forking: {
                url: secret.url_arbitrum,
                enabled: false,
                // blockNumber: 60765058
            },
            allowUnlimitedContractSize: true
        }
    },
    etherscan: {
        apiKey: secret.api_key_polygon
    },
}
export default config;

