import {CHAIN_ID_LOCAL, CHAIN_ID_MUMBAI} from "./chains";

export const depositFee = 50 // 0.005
export const minExecutionFee = 4000 // wei


export function getWNativeConfigByChainId(wnative: any, chainId: string) {
    if (chainId == CHAIN_ID_LOCAL)
        return getWethConfig(wnative);
    else if (chainId == CHAIN_ID_MUMBAI)
        return getWmaticConfig(wnative);
}

export function getWmaticConfig(wmatic: any) {
    return [
        wmatic.address, // _token
        18, // _tokenDecimals
        10000, // _tokenWeight
        75, // _minProfitBps
        0, // _maxUsdmAmount
        false, // _isStable
        true // _isShortable
    ]
}

export function getWethConfig(weth: any) {
    return [
        weth.address, // _token
        18, // _tokenDecimals
        10000, // _tokenWeight
        75, // _minProfitBps
        0, // _maxUsdmAmount
        false, // _isStable
        true // _isShortable
    ]
}

export function getWbtcConfig(wbtc: any) {
    return [
        wbtc.address, // _token
        8, // _tokenDecimals
        10000, // _tokenWeight
        75, // _minProfitBps
        0, // _maxUsdmAmount
        false, // _isStable
        true // _isShortable
    ]
}

export function getDaiConfig(dai: any) {
    return [
        dai.address, // _token
        18, // _tokenDecimals
        10000, // _tokenWeight
        75, // _minProfitBps
        0, // _maxUsdmAmount
        true, // _isStable
        false // _isShortable
    ]
}
