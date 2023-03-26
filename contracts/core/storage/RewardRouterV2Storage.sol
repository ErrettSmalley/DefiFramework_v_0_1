// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./RewardRouterV2Aggregator.sol";
abstract contract RewardRouterV2Storage is RewardRouterV2Aggregator {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using Address for address payable;
    bool public isInitialized;
    address public weth;
    address public mold;
    address public esMold;
    address public bnMold;
    address public mlp;
    address public stakedMoldTracker;
    address public bonusMoldTracker;
    address public feeMoldTracker;
    address public stakedMlpTracker;
    address public feeMlpTracker;
    address public mlpManager;
    address public mlpVester;
    address public moldVester;
    mapping (address => address) public pendingReceivers;
}
