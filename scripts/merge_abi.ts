import {deployments, getChainId, network} from 'hardhat';
import {AddressZero} from "../helpers/utils";

import fs from "fs";
import {getWmaticConfig} from "../helpers/params";

let fullPath: string;
let networkName: string;
let chainId: string;

let addrInfo: any = {
    Vault: AddressZero,
    Router: AddressZero,
    VaultReader: AddressZero,
    Reader: AddressZero,
    MlpManager: AddressZero,
    RewardRouter: AddressZero,
    RewardReader: AddressZero,
    NATIVE_TOKEN: AddressZero,
    MLP: AddressZero,
    GMX: AddressZero,
    ES_GMX: AddressZero,
    BN_GMX: AddressZero,
    USDM: AddressZero,
    ES_GMX_IOU: AddressZero,

    StakedGmxTracker: AddressZero,
    BonusGmxTracker: AddressZero,
    FeeGmxTracker: AddressZero,
    StakedMlpTracker: AddressZero,
    FeeMlpTracker: AddressZero,

    StakedGmxDistributor: AddressZero,
    StakedMlpDistributor: AddressZero,

    GmxVester: AddressZero,
    MlpVester: AddressZero,

    OrderBook: AddressZero,
    OrderExecutor: AddressZero,
    OrderBookReader: AddressZero,

    PositionRouter: AddressZero,
    PositionManager: AddressZero,

    TraderJoeGmxAvaxPool: AddressZero,
    ReferralStorage: AddressZero,
    ReferralReader: AddressZero,
}

let separateTokens: any = {}

async function main() {

    console.log("=== merge abi start at %s ===", new Date().toString());
    networkName = network.name;
    fullPath = "deployments/" + networkName;
    chainId = await getChainId();
    merge_abi(chainId);
    console.log("=== merge abi end at %s ===", new Date().toString());
}

main().then(() => {
    console.log("success");
});

let excludeContracts = [
    "DaiPriceFeed",
    "Timelock",
    "VaultErrorController",
    "VaultUtils",
    "WethPriceFeed"
]

let separateContracts = [
    "WETH",
    "WBTC",
    "DAI",
]

let apiTargetContracts = [
    "Vault",
    "PositionManager",
    "WETH",
    "WBTC",
    "WNative",
    "Reader",
    "DAI"
]

function merge_abi(chainId: string) {

    fs.readdir(fullPath, function (err: any, files: []) {

        if (err)
            return console.log('Unable to scan directory: ' + err);

        // let abi: any = {};
        let sql = ""

        files.forEach(function (file: string) {

            let index = file.indexOf(".json");
            if (index < 0)
                return;

            let data = JSON.parse(fs.readFileSync(fullPath + "/" + file, {encoding: 'utf-8'}));

            let contractName = file.substring(0, index);

            if (apiTargetContracts.includes(contractName)) {
                let field;
                switch (contractName) {
                    case "Vault":
                        field = "vault_contract"
                        break;
                    case "PositionManager":
                        field = "position_manager_contract"
                        break;
                    case "WETH":
                        field = "weth_contract"
                        break;
                    case "WNative":
                        field = "wnative_contract"
                        break;
                    case "Reader":
                        field = "reader_contract"
                        break;
                    case "WBTC":
                        field = "wbtc_contract"
                        break;
                    case "DAI":
                        field = "dai_contract"
                }

                // sql += `INSERT INTO t_config VALUES (null, '${field}', '${data["address"].toLowerCase()}', ${chainId});\n`;
                sql += `UPDATE t_config SET value ='${data["address"].toLowerCase()}' WHERE name = '${field}' AND chain = ${chainId};\n`;
            }

            if (excludeContracts.includes(contractName))
                return

            console.log(".. including abi:", contractName);

            if (separateContracts.includes(contractName)) {
                separateTokens[contractName] = data["address"]
                return
            }

            if (contractName == "WNative")
                contractName = "NATIVE_TOKEN"
            addrInfo[contractName] = data["address"];

            // abi[contractName] = {
            //     "address": data["address"],
            //     "abi": data["abi"]
            // }

        });

        // fs.writeFileSync('scripts/abi/deployments_' + networkName + "_" + getDate() + '.json', JSON.stringify(abi));

        let result = cleanIt(addrInfo);
        let separates = cleanIt(separateTokens);

        result += "\n\n" + separates
        fs.writeFileSync('scripts/addresses/addresses_' + networkName + "_" + getDate() + '.txt', result);

        console.log(">> sql result:\n", sql);
    });
}

function cleanIt(obj) {
    let cleaned = JSON.stringify(obj, null, 2);

    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
        return match.replace(/"/g, "");
    });
}

function getDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let monthStr = month.toString();
    let dayStr = day.toString();
    if (month >= 1 && month <= 9) {
        monthStr = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        dayStr = "0" + dayStr;
    }
    return monthStr + dayStr;
}
