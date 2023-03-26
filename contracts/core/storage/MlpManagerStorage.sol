// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./MlpManagerAggregators.sol";
abstract contract MlpManagerStorage is MlpManagerAggregators {
    /* constructor */
    IVault public vault;
    address public override usdm;
    address public mlp;
    IShortsTracker public shortsTracker;
    /* settings */
    bool public inPrivateMode;
    uint256 public shortsTrackerAveragePriceWeight;
    mapping (address => bool) public isHandler;
    uint256 public override cooldownDuration;
    uint256 public aumAddition;
    uint256 public aumDeduction;
    /* misc */
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    mapping (address => uint256) public override lastAddedAt; /* account address => timestamp*/
}
