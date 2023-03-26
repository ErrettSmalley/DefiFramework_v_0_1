// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "../storage/OrderBookStorage.sol";
abstract contract OrderBookSettings is OrderBookStorage {
    function setMinExecutionFee(uint256 _minExecutionFee) external onlyGov {
        minExecutionFee = _minExecutionFee;
        emit Events.UpdateMinExecutionFee(_minExecutionFee);
    }
    function setMinPurchaseTokenAmountUsd(uint256 _minPurchaseTokenAmountUsd) external onlyGov {
        minPurchaseTokenAmountUsd = _minPurchaseTokenAmountUsd;
        emit Events.UpdateMinPurchaseTokenAmountUsd(_minPurchaseTokenAmountUsd);
    }
    function setGov(address _gov) external onlyGov {
        gov = _gov;
        emit Events.UpdateGov(_gov);
    }

//    function createSwapOrder(address[] memory _path, uint256 _amountIn, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap, bool _shouldUnwrap) external payable nonReentrant {
//        require(_path.length == 2 || _path.length == 3, Errors.ORDERBOOK_INVALID_PATH_LENGTH);
//        require(_path[0] != _path[_path.length - 1], Errors.ORDERBOOK_INVALID_PATH);
//        require(_amountIn > 0, Errors.ORDERBOOK_INVALID_AMOUNTIN);
//        require(_executionFee >= minExecutionFee, Errors.ORDERBOOK_INSUFFICIENT_EXECUTION_FEE);
//        _transferInETH();
//        if (_shouldWrap) {
//            require(_path[0] == weth, Errors.ORDERBOOK_ONLY_WETH_COULD_BE_WRAPPED);
//            require(msg.value == _executionFee.add(_amountIn), Errors.ORDERBOOK_INCORRECT_VALUE_TRANSFERRED);
//        } else {
//            require(msg.value == _executionFee, Errors.ORDERBOOK_INCORRECT_EXECUTION_FEE_TRANSFERRED);
//            IRouter(router).pluginTransfer(_path[0], msg.sender, address(this), _amountIn);
//        }
//        _createSwapOrder(msg.sender, _path, _amountIn, _minOut, _triggerRatio, _triggerAboveThreshold, _shouldUnwrap, _executionFee);
//    }
//    function executeSwapOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) override external nonReentrant {
//        DataTypes.SwapOrder memory order = swapOrders[_account][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        if (order.triggerAboveThreshold) {
//            require(
//                validateSwapOrderPriceWithTriggerAboveThreshold(order.path, order.triggerRatio),
//                Errors.ORDERBOOK_INVALID_PRICE_FOR_EXECUTION
//            );
//        }
//        delete swapOrders[_account][_orderIndex];
//        IERC20(order.path[0]).safeTransfer(vault, order.amountIn);
//        uint256 _amountOut;
//        if (order.path[order.path.length - 1] == weth && order.shouldUnwrap) {
//            _amountOut = _swap(order.path, order.minOut, address(this));
//            _transferOutETH(_amountOut, payable(order.account));
//        } else {
//            _amountOut = _swap(order.path, order.minOut, order.account);
//        }
//        _transferOutETH(order.executionFee, _feeReceiver);
//        emit Events.ExecuteSwapOrder(_account, _orderIndex, order.path, order.amountIn, order.minOut, _amountOut, order.triggerRatio, order.triggerAboveThreshold, order.shouldUnwrap, order.executionFee);
//    }
//    function updateSwapOrder(uint256 _orderIndex, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold) external nonReentrant {
//        DataTypes.SwapOrder storage order = swapOrders[msg.sender][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        order.minOut = _minOut;
//        order.triggerRatio = _triggerRatio;
//        order.triggerAboveThreshold = _triggerAboveThreshold;
//        emit Events.UpdateSwapOrder(msg.sender, _orderIndex, order.path, order.amountIn, _minOut, _triggerRatio, _triggerAboveThreshold, order.shouldUnwrap, order.executionFee);
//    }
//    function cancelSwapOrder(uint256 _orderIndex) public nonReentrant {
//        DataTypes.SwapOrder memory order = swapOrders[msg.sender][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        delete swapOrders[msg.sender][_orderIndex];
//        if (order.path[0] == weth) {
//            _transferOutETH(order.executionFee.add(order.amountIn), msg.sender);
//        } else {
//            IERC20(order.path[0]).safeTransfer(msg.sender, order.amountIn);
//            _transferOutETH(order.executionFee, msg.sender);
//        }
//        emit Events.CancelSwapOrder(msg.sender, _orderIndex, order.path, order.amountIn, order.minOut, order.triggerRatio, order.triggerAboveThreshold, order.shouldUnwrap, order.executionFee);
//    }
//
//    function createIncreaseOrder(address[] memory _path, uint256 _amountIn, address _indexToken, uint256 _minOut, uint256 _sizeDelta, address _collateralToken, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap) external payable nonReentrant {
//        _transferInETH();
//        require(_executionFee >= minExecutionFee, Errors.ORDERBOOK_INSUFFICIENT_EXECUTION_FEE);
//        if (_shouldWrap) {
//            require(_path[0] == weth, Errors.ORDERBOOK_ONLY_WETH_COULD_BE_WRAPPED);
//            require(msg.value == _executionFee.add(_amountIn), Errors.ORDERBOOK_INCORRECT_VALUE_TRANSFERRED);
//        } else {
//            require(msg.value == _executionFee, Errors.ORDERBOOK_INCORRECT_EXECUTION_FEE_TRANSFERRED);
//            IRouter(router).pluginTransfer(_path[0], msg.sender, address(this), _amountIn);
//        }
//        address _purchaseToken = _path[_path.length - 1];
//        uint256 _purchaseTokenAmount;
//        if (_path.length > 1) {
//            require(_path[0] != _purchaseToken, Errors.ORDERBOOK_INVALID_PATH);
//            IERC20(_path[0]).safeTransfer(vault, _amountIn);
//            _purchaseTokenAmount = _swap(_path, _minOut, address(this));
//        } else {
//            _purchaseTokenAmount = _amountIn;
//        }
//        {
//            uint256 _purchaseTokenAmountUsd = IVault(vault).tokenToUsdMin(_purchaseToken, _purchaseTokenAmount);
//            require(_purchaseTokenAmountUsd >= minPurchaseTokenAmountUsd, Errors.ORDERBOOK_INSUFFICIENT_COLLATERAL);
//        }
//        _createIncreaseOrder(msg.sender, _purchaseToken, _purchaseTokenAmount, _collateralToken, _indexToken, _sizeDelta, _isLong, _triggerPrice, _triggerAboveThreshold, _executionFee);
//    }
//    function executeIncreaseOrder(address _address, uint256 _orderIndex, address payable _feeReceiver) override external nonReentrant {
//        DataTypes.IncreaseOrder memory order = increaseOrders[_address][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        (uint256 currentPrice, ) = validatePositionOrderPrice(order.triggerAboveThreshold, order.triggerPrice, order.indexToken, order.isLong, true);
//        delete increaseOrders[_address][_orderIndex];
//        IERC20(order.purchaseToken).safeTransfer(vault, order.purchaseTokenAmount);
//        if (order.purchaseToken != order.collateralToken) {
//            address[] memory path = new address[](2);
//            path[0] = order.purchaseToken;
//            path[1] = order.collateralToken;
//            uint256 amountOut = _swap(path, 0, address(this));
//            IERC20(order.collateralToken).safeTransfer(vault, amountOut);
//        }
//        IRouter(router).pluginIncreasePosition(order.account, order.collateralToken, order.indexToken, order.sizeDelta, order.isLong);
//        _transferOutETH(order.executionFee, _feeReceiver);
//        emit Events.ExecuteIncreaseOrder(order.account, _orderIndex, order.purchaseToken, order.purchaseTokenAmount, order.collateralToken, order.indexToken, order.sizeDelta, order.isLong, order.triggerPrice, order.triggerAboveThreshold, order.executionFee, currentPrice);
//    }
//    function updateIncreaseOrder(uint256 _orderIndex, uint256 _sizeDelta, uint256 _triggerPrice, bool _triggerAboveThreshold) external nonReentrant {
//        DataTypes.IncreaseOrder storage order = increaseOrders[msg.sender][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        order.triggerPrice = _triggerPrice;
//        order.triggerAboveThreshold = _triggerAboveThreshold;
//        order.sizeDelta = _sizeDelta;
//        emit Events.UpdateIncreaseOrder(msg.sender, _orderIndex, order.collateralToken, order.indexToken, order.isLong, _sizeDelta, _triggerPrice, _triggerAboveThreshold);
//    }
//    function cancelIncreaseOrder(uint256 _orderIndex) public nonReentrant {
//        DataTypes.IncreaseOrder memory order = increaseOrders[msg.sender][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        delete increaseOrders[msg.sender][_orderIndex];
//        if (order.purchaseToken == weth) {
//            _transferOutETH(order.executionFee.add(order.purchaseTokenAmount), msg.sender);
//        } else {
//            IERC20(order.purchaseToken).safeTransfer(msg.sender, order.purchaseTokenAmount);
//            _transferOutETH(order.executionFee, msg.sender);
//        }
//        emit Events.CancelIncreaseOrder(order.account, _orderIndex, order.purchaseToken, order.purchaseTokenAmount, order.collateralToken, order.indexToken, order.sizeDelta, order.isLong, order.triggerPrice, order.triggerAboveThreshold, order.executionFee);
//    }
//
//    function createDecreaseOrder(address _indexToken, uint256 _sizeDelta, address _collateralToken, uint256 _collateralDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold) external payable nonReentrant {
//        _transferInETH();
//        require(msg.value > minExecutionFee, Errors.ORDERBOOK_INSUFFICIENT_EXECUTION_FEE);
//        _createDecreaseOrder(msg.sender, _collateralToken, _collateralDelta, _indexToken, _sizeDelta, _isLong, _triggerPrice, _triggerAboveThreshold);
//    }
//    function executeDecreaseOrder(address _address, uint256 _orderIndex, address payable _feeReceiver) override external nonReentrant {
//        DataTypes.DecreaseOrder memory order = decreaseOrders[_address][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        (uint256 currentPrice, ) = validatePositionOrderPrice(order.triggerAboveThreshold, order.triggerPrice, order.indexToken, !order.isLong, true);
//        delete decreaseOrders[_address][_orderIndex];
//        uint256 amountOut = IRouter(router).pluginDecreasePosition(order.account, order.collateralToken, order.indexToken, order.collateralDelta, order.sizeDelta, order.isLong, address(this));
//        if (order.collateralToken == weth) {
//            _transferOutETH(amountOut, payable(order.account));
//        } else {
//            IERC20(order.collateralToken).safeTransfer(order.account, amountOut);
//        }
//        _transferOutETH(order.executionFee, _feeReceiver);
//        emit Events.ExecuteDecreaseOrder(order.account, _orderIndex, order.collateralToken, order.collateralDelta, order.indexToken, order.sizeDelta, order.isLong, order.triggerPrice, order.triggerAboveThreshold, order.executionFee, currentPrice);
//    }
//    function updateDecreaseOrder(uint256 _orderIndex, uint256 _collateralDelta, uint256 _sizeDelta, uint256 _triggerPrice, bool _triggerAboveThreshold) external nonReentrant {
//        DataTypes.DecreaseOrder storage order = decreaseOrders[msg.sender][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        order.triggerPrice = _triggerPrice;
//        order.triggerAboveThreshold = _triggerAboveThreshold;
//        order.sizeDelta = _sizeDelta;
//        order.collateralDelta = _collateralDelta;
//        emit Events.UpdateDecreaseOrder(msg.sender, _orderIndex, order.collateralToken, _collateralDelta, order.indexToken, _sizeDelta, order.isLong, _triggerPrice, _triggerAboveThreshold);
//    }
//    function cancelDecreaseOrder(uint256 _orderIndex) public nonReentrant {
//        DataTypes.DecreaseOrder memory order = decreaseOrders[msg.sender][_orderIndex];
//        require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
//        delete decreaseOrders[msg.sender][_orderIndex];
//        _transferOutETH(order.executionFee, msg.sender);
//        emit Events.CancelDecreaseOrder(order.account, _orderIndex, order.collateralToken, order.collateralDelta, order.indexToken, order.sizeDelta, order.isLong, order.triggerPrice, order.triggerAboveThreshold, order.executionFee);
//    }
//
//    function validateSwapOrderPriceWithTriggerAboveThreshold(address[] memory _path, uint256 _triggerRatio) public view returns (bool) {
//        require(_path.length == 2 || _path.length == 3, Errors.ORDERBOOK_INVALID_PATH_LENGTH);
//        address tokenA = _path[0];
//        address tokenB = _path[_path.length - 1];
//        uint256 tokenAPrice;
//        uint256 tokenBPrice;
//        if (tokenA == usdm) {
//            tokenAPrice = getUsdmMinPrice(_path[1]);
//        } else {
//            tokenAPrice = IVault(vault).getMinPrice(tokenA);
//        }
//        if (tokenB == usdm) {
//            tokenBPrice = Constants.PRICE_PRECISION;
//        } else {
//            tokenBPrice = IVault(vault).getMaxPrice(tokenB);
//        }
//        uint256 currentRatio = tokenBPrice.mul(Constants.PRICE_PRECISION).div(tokenAPrice);
//        bool isValid = currentRatio > _triggerRatio;
//        return isValid;
//    }
//    function validatePositionOrderPrice(bool _triggerAboveThreshold, uint256 _triggerPrice, address _indexToken, bool _maximizePrice, bool _raise) public view returns (uint256, bool) {
//        uint256 currentPrice = _maximizePrice
//            ? IVault(vault).getMaxPrice(_indexToken) : IVault(vault).getMinPrice(_indexToken);
//        bool isPriceValid = _triggerAboveThreshold ? currentPrice > _triggerPrice : currentPrice < _triggerPrice;
//        if (_raise) {
//            require(isPriceValid, Errors.ORDERBOOK_INVALID_PRICE_FOR_EXECUTION);
//        }
//        return (currentPrice, isPriceValid);
//    }
//    function cancelMultiple(uint256[] memory _swapOrderIndexes, uint256[] memory _increaseOrderIndexes, uint256[] memory _decreaseOrderIndexes) external {
//        for (uint256 i = 0; i < _swapOrderIndexes.length; i++) {
//            cancelSwapOrder(_swapOrderIndexes[i]);
//        }
//        for (uint256 i = 0; i < _increaseOrderIndexes.length; i++) {
//            cancelIncreaseOrder(_increaseOrderIndexes[i]);
//        }
//        for (uint256 i = 0; i < _decreaseOrderIndexes.length; i++) {
//            cancelDecreaseOrder(_decreaseOrderIndexes[i]);
//        }
//    }

//    function _transferInETH() internal {
//        if (msg.value != 0) {
//            IWETH(weth).deposit{value: msg.value}();
//        }
//    }
//    function _transferOutETH(uint256 _amountOut, address payable _receiver) internal {
//        IWETH(weth).withdraw(_amountOut);
//        _receiver.sendValue(_amountOut);
//    }
//    function _swap(address[] memory _path, uint256 _minOut, address _receiver) internal returns (uint256) {
//        if (_path.length == 2) {
//            return _vaultSwap(_path[0], _path[1], _minOut, _receiver);
//        }
//        if (_path.length == 3) {
//            uint256 midOut = _vaultSwap(_path[0], _path[1], 0, address(this));
//            IERC20(_path[1]).safeTransfer(vault, midOut);
//            return _vaultSwap(_path[1], _path[2], _minOut, _receiver);
//        }
//        revert(Errors.ORDERBOOK_INVALID_PATH_LENGTH);
//    }
//    function _vaultSwap(address _tokenIn, address _tokenOut, uint256 _minOut, address _receiver) internal returns (uint256) {
//        uint256 amountOut;
//        if (_tokenOut == usdm) {
//            amountOut = IVault(vault).buyUSDM(_tokenIn, _receiver);
//        } else if (_tokenIn == usdm) {
//            amountOut = IVault(vault).sellUSDM(_tokenOut, _receiver);
//        } else {
//            amountOut = IVault(vault).swap(_tokenIn, _tokenOut, _receiver);
//        }
//        require(amountOut >= _minOut, Errors.ORDERBOOK_INSUFFICIENT_AMOUNTOUT);
//        return amountOut;
//    }
//    function _createSwapOrder(address _account, address[] memory _path, uint256 _amountIn, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold, bool _shouldUnwrap, uint256 _executionFee) internal {
//        uint256 _orderIndex = swapOrdersIndex[_account];
//        DataTypes.SwapOrder memory order = DataTypes.SwapOrder(_account, _path, _amountIn, _minOut, _triggerRatio, _triggerAboveThreshold, _shouldUnwrap, _executionFee);
//        swapOrdersIndex[_account] = _orderIndex.add(1);
//        swapOrders[_account][_orderIndex] = order;
//        emit Events.CreateSwapOrder(_account, _orderIndex, _path, _amountIn, _minOut, _triggerRatio, _triggerAboveThreshold, _shouldUnwrap, _executionFee);
//    }
//    function _createDecreaseOrder(address _account, address _collateralToken, uint256 _collateralDelta, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold) internal {
//        uint256 _orderIndex = decreaseOrdersIndex[_account];
//        DataTypes.DecreaseOrder memory order = DataTypes.DecreaseOrder(_account, _collateralToken, _collateralDelta, _indexToken, _sizeDelta, _isLong, _triggerPrice, _triggerAboveThreshold, msg.value);
//        decreaseOrdersIndex[_account] = _orderIndex.add(1);
//        decreaseOrders[_account][_orderIndex] = order;
//        emit Events.CreateDecreaseOrder(_account, _orderIndex, _collateralToken, _collateralDelta, _indexToken, _sizeDelta, _isLong, _triggerPrice, _triggerAboveThreshold, msg.value);
//    }
//    function _createIncreaseOrder(address _account, address _purchaseToken, uint256 _purchaseTokenAmount, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold, uint256 _executionFee) internal {
//        uint256 _orderIndex = increaseOrdersIndex[msg.sender];
//        DataTypes.IncreaseOrder memory order = DataTypes.IncreaseOrder(_account, _purchaseToken, _purchaseTokenAmount, _collateralToken, _indexToken, _sizeDelta, _isLong, _triggerPrice, _triggerAboveThreshold, _executionFee);
//        increaseOrdersIndex[_account] = _orderIndex.add(1);
//        increaseOrders[_account][_orderIndex] = order;
//        emit Events.CreateIncreaseOrder(_account, _orderIndex, _purchaseToken, _purchaseTokenAmount, _collateralToken, _indexToken, _sizeDelta, _isLong, _triggerPrice, _triggerAboveThreshold, _executionFee);
//    }

//    function getSwapOrder(address _account, uint256 _orderIndex) override public view returns (address path0, address path1, address path2, uint256 amountIn, uint256 minOut, uint256 triggerRatio, bool triggerAboveThreshold, bool shouldUnwrap, uint256 executionFee) {
//        DataTypes.SwapOrder memory order = swapOrders[_account][_orderIndex];
//        return (order.path.length > 0 ? order.path[0] : address(0), order.path.length > 1 ? order.path[1] : address(0), order.path.length > 2 ? order.path[2] : address(0), order.amountIn, order.minOut, order.triggerRatio, order.triggerAboveThreshold, order.shouldUnwrap, order.executionFee);
//    }
//    function getUsdmMinPrice(address _otherToken) public view returns (uint256) {
//        uint256 redemptionAmount = IVault(vault).getRedemptionAmount(_otherToken, Constants.USDM_PRECISION);
//        uint256 otherTokenPrice = IVault(vault).getMinPrice(_otherToken);
//        uint256 otherTokenDecimals = IVault(vault).tokenDecimals(_otherToken);
//        return redemptionAmount.mul(otherTokenPrice).div(10 ** otherTokenDecimals);
//    }
//    function getDecreaseOrder(address _account, uint256 _orderIndex) override public view returns (address collateralToken, uint256 collateralDelta, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee) {
//        DataTypes.DecreaseOrder memory order = decreaseOrders[_account][_orderIndex];
//        return (order.collateralToken, order.collateralDelta, order.indexToken, order.sizeDelta, order.isLong, order.triggerPrice, order.triggerAboveThreshold, order.executionFee);
//    }
//    function getIncreaseOrder(address _account, uint256 _orderIndex) override public view returns (address purchaseToken, uint256 purchaseTokenAmount, address collateralToken, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee) {
//        DataTypes.IncreaseOrder memory order = increaseOrders[_account][_orderIndex];
//        return (order.purchaseToken, order.purchaseTokenAmount, order.collateralToken, order.indexToken, order.sizeDelta, order.isLong, order.triggerPrice, order.triggerAboveThreshold, order.executionFee);
//    }
}
