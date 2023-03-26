// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./OrderBookAggregators.sol";
abstract contract OrderBookStorage is OrderBookAggregators{
    /* constructor */
    bool public isInitialized = false;
    address public router;
    address public vault;
    address public weth;
    address public usdm;
    /* settings */
    uint256 public minExecutionFee;
    uint256 public minPurchaseTokenAmountUsd;
    address public gov;
    /* misc */
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using Address for address payable;
    modifier onlyGov() {
        require(msg.sender == gov, Errors.ORDERBOOK_FORBIDDEN);
        _;
    }

//    mapping (address => mapping(uint256 => DataTypes.IncreaseOrder)) public increaseOrders;
//    mapping (address => uint256) public increaseOrdersIndex;
//    mapping (address => mapping(uint256 => DataTypes.DecreaseOrder)) public decreaseOrders;
//    mapping (address => uint256) public decreaseOrdersIndex;
//    mapping (address => mapping(uint256 => DataTypes.SwapOrder)) public swapOrders;
//    mapping (address => uint256) public swapOrdersIndex;
}
