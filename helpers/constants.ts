import {parseUnits} from "ethers/lib/utils";

export const DEFAULT_WITHIN = 10000;
export const MEDIUM_WITHIN = 100000000;
export const MAX_WITHIN = 0x1ffffffffffffe; // 0.009e18

// decimals
export const BASIS_POINTS_DIVISOR = 10000;
export const FUNDING_RATE_PRECISION = 1000000;

// fees
export const MARGIN_FEE_BASIS_POINTS = 10;
export const LIQUIDATION_FEE = parseUnits("5", 30); // $

// system
export const MAX_LEVERAGE = 50 * BASIS_POINTS_DIVISOR;

// contracts
export const PRICE_FEED_ETH_MUMBAI = "0x0715A7794a1dc8e42615F059dD6e406A6594651A";
export const PRICE_FEED_MATIC_MUMBAI = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
export const PRICE_FEED_DAI_MUMBAI = "0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046";
export const PRICE_FEED_BTC_MUMBAI = "0x007A22900a3B98143368Bd5906f8E17e9867581b";
