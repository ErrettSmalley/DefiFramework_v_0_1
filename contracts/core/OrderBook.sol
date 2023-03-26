// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./settings/OrderBookSettings.sol";
contract OrderBook is OrderBookSettings {
    constructor() public {
        gov = msg.sender;
    }
    function initialize(address _router, address _vault, address _weth, address _usdm, uint256 _minExecutionFee, uint256 _minPurchaseTokenAmountUsd) external onlyGov {
        require(!isInitialized, Errors.ORDERBOOK_ALREADY_INITIALIZED);
        isInitialized = true;
        router = _router;
        vault = _vault;
        weth = _weth;
        usdm = _usdm;
        minExecutionFee = _minExecutionFee;
        minPurchaseTokenAmountUsd = _minPurchaseTokenAmountUsd;
        emit Events.Initialize(_router, _vault, _weth, _usdm, _minExecutionFee, _minPurchaseTokenAmountUsd);
    }
    receive() external payable {
        require(msg.sender == weth, Errors.ORDERBOOK_INVALID_SENDER);
    }
}
