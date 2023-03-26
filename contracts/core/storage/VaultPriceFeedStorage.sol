// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "../../oracle/interfaces/IPriceFeed.sol";
import "../../oracle/interfaces/ISecondaryPriceFeed.sol";
import "../../oracle/interfaces/IChainlinkFlags.sol";
import "../../amm/interfaces/IPancakePair.sol";
import "../interfaces/IVaultPriceFeed.sol";
import "../../libraries/math/SafeMath.sol";
import "../../libraries/Errors.sol";
import "../../libraries/Constants.sol";
abstract contract VaultPriceFeedStorage is IVaultPriceFeed  {
    uint256 public spreadThresholdBasisPoints = 30;
    uint256 public priceSampleSpace = 3;
    uint256 public maxStrictPriceDeviation = 0;
    bool public isAmmEnabled = true;
    bool public isSecondaryPriceEnabled = true;
    bool public useV2Pricing = false;
    bool public favorPrimaryPrice = false;
    address public gov;
    address public chainlinkFlags;
    address public secondaryPriceFeed;
    address public btc;
    address public eth;
    address public bnb;
    address public bnbBusd;
    address public ethBnb;
    address public btcBnb;
    mapping (address => address) public priceFeeds;
    mapping (address => uint256) public priceDecimals;
    mapping (address => uint256) public spreadBasisPoints;
    mapping (address => bool) public strictStableTokens;
    mapping (address => uint256) public override adjustmentBasisPoints;
    mapping (address => bool) public override isAdjustmentAdditive;
    mapping (address => uint256) public lastAdjustmentTimings;
    using SafeMath for uint256;
    modifier onlyGov() {
        require(msg.sender == gov, Errors.VAULTPRICEFEED_FORBIDDEN);
        _;
    }
}
