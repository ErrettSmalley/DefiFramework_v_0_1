// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
import "../storage/VaultStorage.sol";
abstract contract VaultSettings is VaultStorage {
    function _onlyGov() internal view {
        _validate(msg.sender == gov, 53);
    }
    function setVaultUtils(IVaultUtils _vaultUtils) external override {
        _onlyGov();
        vaultUtils = _vaultUtils;
    }
    function setErrorController(address _errorController) external {
        _onlyGov();
        errorController = _errorController;
    }
    function setError(uint256 _errorCode, string calldata _error) external override {
        require(msg.sender == errorController, Errors.VAULT_INVALID_ERRORCONTROLLER);
        errors[_errorCode] = _error;
    }
    function setInManagerMode(bool _inManagerMode) external override {
        _onlyGov();
        inManagerMode = _inManagerMode;
    }
    function setManager(address _manager, bool _isManager) external override {
        _onlyGov();
        isManager[_manager] = _isManager;
    }
    function setInPrivateLiquidationMode(bool _inPrivateLiquidationMode) external override {
        _onlyGov();
        inPrivateLiquidationMode = _inPrivateLiquidationMode;
    }
    function setLiquidator(address _liquidator, bool _isActive) external override {
        _onlyGov();
        isLiquidator[_liquidator] = _isActive;
    }
    function setIsSwapEnabled(bool _isSwapEnabled) external override {
        _onlyGov();
        isSwapEnabled = _isSwapEnabled;
    }
    function setIsLeverageEnabled(bool _isLeverageEnabled) external override {
        _onlyGov();
        isLeverageEnabled = _isLeverageEnabled;
    }
    function setMaxGasPrice(uint256 _maxGasPrice) external override {
        _onlyGov();
        maxGasPrice = _maxGasPrice;
    }
    function setGov(address _gov) external {
        _onlyGov();
        gov = _gov;
    }
    function setPriceFeed(address _priceFeed) external override {
        _onlyGov();
        priceFeed = _priceFeed;
    }
    function setMaxLeverage(uint256 _maxLeverage) external override {
        _onlyGov();
        _validate(_maxLeverage > Constants.MIN_LEVERAGE, 2);
        maxLeverage = _maxLeverage;
    }
    function setBufferAmount(address _token, uint256 _amount) external override {
        _onlyGov();
        bufferAmounts[_token] = _amount;
    }
    function setMaxGlobalShortSize(address _token, uint256 _amount) external override {
        _onlyGov();
        maxGlobalShortSizes[_token] = _amount;
    }
    function setFees(uint256 _taxBasisPoints, uint256 _stableTaxBasisPoints, uint256 _mintBurnFeeBasisPoints, uint256 _swapFeeBasisPoints, uint256 _stableSwapFeeBasisPoints, uint256 _marginFeeBasisPoints, uint256 _liquidationFeeUsd, uint256 _minProfitTime, bool _hasDynamicFees) external override {
        _onlyGov();
        _validate(_taxBasisPoints <= Constants.MAX_FEE_BASIS_POINTS, 3);
        _validate(_stableTaxBasisPoints <= Constants.MAX_FEE_BASIS_POINTS, 4);
        _validate(_mintBurnFeeBasisPoints <= Constants.MAX_FEE_BASIS_POINTS, 5);
        _validate(_swapFeeBasisPoints <= Constants.MAX_FEE_BASIS_POINTS, 6);
        _validate(_stableSwapFeeBasisPoints <= Constants.MAX_FEE_BASIS_POINTS, 7);
        _validate(_marginFeeBasisPoints <= Constants.MAX_FEE_BASIS_POINTS, 8);
        _validate(_liquidationFeeUsd <= Constants.MAX_LIQUIDATION_FEE_USD, 9);
        taxBasisPoints = _taxBasisPoints;
        stableTaxBasisPoints = _stableTaxBasisPoints;
        mintBurnFeeBasisPoints = _mintBurnFeeBasisPoints;
        swapFeeBasisPoints = _swapFeeBasisPoints;
        stableSwapFeeBasisPoints = _stableSwapFeeBasisPoints;
        marginFeeBasisPoints = _marginFeeBasisPoints;
        liquidationFeeUsd = _liquidationFeeUsd;
        minProfitTime = _minProfitTime;
        hasDynamicFees = _hasDynamicFees;
    }
    function setFundingRate(uint256 _fundingInterval, uint256 _fundingRateFactor, uint256 _stableFundingRateFactor) external override {
        _onlyGov();
        // TODO K
//        _validate(_fundingInterval >= Constants.MIN_FUNDING_RATE_INTERVAL, 10);
//        _validate(_fundingRateFactor <= Constants.MAX_FUNDING_RATE_FACTOR, 11);
//        _validate(_stableFundingRateFactor <= Constants.MAX_FUNDING_RATE_FACTOR, 12);
        fundingInterval = _fundingInterval;
        fundingRateFactor = _fundingRateFactor;
        stableFundingRateFactor = _stableFundingRateFactor;
    }
    function setTokenConfig(address _token, uint256 _tokenDecimals, uint256 _tokenWeight, uint256 _minProfitBps, uint256 _maxUsdmAmount, bool _isStable, bool _isShortable) external override {
        _onlyGov();
        if (!whitelistedTokens[_token]) {
            whitelistedTokenCount = whitelistedTokenCount.add(1);
            allWhitelistedTokens.push(_token);
        }
        uint256 _totalTokenWeights = totalTokenWeights;
        _totalTokenWeights = _totalTokenWeights.sub(tokenWeights[_token]);

        whitelistedTokens[_token] = true;
        tokenDecimals[_token] = _tokenDecimals;
        tokenWeights[_token] = _tokenWeight;
        minProfitBasisPoints[_token] = _minProfitBps;
        maxUsdmAmounts[_token] = _maxUsdmAmount;
        stableTokens[_token] = _isStable;
        shortableTokens[_token] = _isShortable;
        totalTokenWeights = _totalTokenWeights.add(_tokenWeight);
        getMaxPrice(_token);
    }
    function setUsdmAmount(address _token, uint256 _amount) external override {
        _onlyGov();
        uint256 usdmAmount = usdmAmounts[_token];
        if (_amount > usdmAmount) {
            _increaseUsdmAmount(_token, _amount.sub(usdmAmount));
            return;
        }
        _decreaseUsdmAmount(_token, usdmAmount.sub(_amount));
    }
    function _validate(bool _condition, uint256 _errorCode) internal view {
        require(_condition, errors[_errorCode]);
    }
    function _increaseUsdmAmount(address _token, uint256 _amount) internal {
        usdmAmounts[_token] = usdmAmounts[_token].add(_amount);
        uint256 maxUsdmAmount = maxUsdmAmounts[_token];
        if (maxUsdmAmount != 0) {
            _validate(usdmAmounts[_token] <= maxUsdmAmount, 51);
        }
        emit Events.IncreaseUsdmAmount(_token, _amount);
    }
    function _decreaseUsdmAmount(address _token, uint256 _amount) internal {
        uint256 value = usdmAmounts[_token];
        if (value <= _amount) {
            usdmAmounts[_token] = 0;
            emit Events.DecreaseUsdmAmount(_token, value);
            return;
        }
        usdmAmounts[_token] = value.sub(_amount);
        emit Events.DecreaseUsdmAmount(_token, _amount);
    }
    function getMaxPrice(address _token) public override view returns (uint256) {
        return IVaultPriceFeed(priceFeed).getPrice(_token, true, includeAmmPrice, useSwapPricing);
    }






//    function getRedemptionCollateral(address _token) public view returns (uint256) {
//        if (stableTokens[_token]) {
//            return poolAmounts[_token];
//        }
//        uint256 collateral = usdToTokenMin(_token, guaranteedUsd[_token]);
//        return collateral.add(poolAmounts[_token]).sub(reservedAmounts[_token]);
//    }
//    function getRedemptionCollateralUsd(address _token) public view returns (uint256) {
//        return tokenToUsdMin(_token, getRedemptionCollateral(_token));
//    }
//    function getPositionDelta(address _account, address _collateralToken, address _indexToken, bool _isLong) public view returns (bool, uint256) {
//        bytes32 key = getPositionKey(_account, _collateralToken, _indexToken, _isLong);
//        DataTypes.Position memory position = positions[key];
//        return getDelta(_indexToken, position.size, position.averagePrice, _isLong, position.lastIncreasedTime);
//    }
//    function getUtilisation(address _token) public view returns (uint256) {
//        uint256 poolAmount = poolAmounts[_token];
//        if (poolAmount == 0) {return 0;}
//        return reservedAmounts[_token].mul(Constants.FUNDING_RATE_PRECISION).div(poolAmount);
//    }
//    function getPositionLeverage(address _account, address _collateralToken, address _indexToken, bool _isLong) public view returns (uint256) {
//        bytes32 key = getPositionKey(_account, _collateralToken, _indexToken, _isLong);
//        DataTypes.Position memory position = positions[key];
//        _validate(position.collateral > 0, 37);
//        return position.size.mul(Constants.BASIS_POINTS_DIVISOR).div(position.collateral);
//    }
//    function getGlobalShortDelta(address _token) public view returns (bool, uint256) {
//            uint256 size = globalShortSizes[_token];
//            if (size == 0) {return (false, 0);}
//            uint256 nextPrice = getMaxPrice(_token);
//            uint256 averagePrice = globalShortAveragePrices[_token];
//            uint256 priceDelta = averagePrice > nextPrice ? averagePrice.sub(nextPrice) : nextPrice.sub(averagePrice);
//            uint256 delta = size.mul(priceDelta).div(averagePrice);
//            bool hasProfit = averagePrice > nextPrice;
//            return (hasProfit, delta);
//        }
}
