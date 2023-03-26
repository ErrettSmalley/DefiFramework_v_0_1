// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./settings/MlpManagerSettings.sol";

contract MlpManager is MlpManagerSettings {
    constructor(address _vault, address _usdm, address _mlp, address _shortsTracker, uint256 _cooldownDuration) public {
        gov = msg.sender;
        vault = IVault(_vault);
        usdm = _usdm;
        mlp = _mlp;
        shortsTracker = IShortsTracker(_shortsTracker);
        cooldownDuration = _cooldownDuration;
    }
    function addLiquidity(address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {
        if (inPrivateMode) {revert(Errors.MLPMANAGER_ACTION_NOT_ENABLED);}
        return _addLiquidity(msg.sender, msg.sender, _token, _amount, _minUsdm, _minMlp);
    }

    function addLiquidityForAccount(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {
        _validateHandler();
        return _addLiquidity(_fundingAccount, _account, _token, _amount, _minUsdm, _minMlp);
    }

    function removeLiquidity(address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {
        if (inPrivateMode) {revert(Errors.MLPMANAGER_ACTION_NOT_ENABLED);}
        return _removeLiquidity(msg.sender, _tokenOut, _mlpAmount, _minOut, _receiver);
    }

    function removeLiquidityForAccount(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {
        _validateHandler();
        return _removeLiquidity(_account, _tokenOut, _mlpAmount, _minOut, _receiver);
    }

    function _addLiquidity(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) internal returns (uint256) {
        require(_amount > 0, Errors.MLPMANAGER_INVALID_AMOUNT);
        uint256 aumInUsdm = getAumInUsdm(true);
        uint256 mlpSupply = IERC20(mlp).totalSupply();
        IERC20(_token).safeTransferFrom(_fundingAccount, address(vault), _amount);
        uint256 usdmAmount = vault.buyUSDM(_token, address(this));
        require(usdmAmount >= _minUsdm, Errors.MLPMANAGER_INSUFFICIENT_USDM_OUTPUT);
        uint256 mintAmount = aumInUsdm == 0 || mlpSupply == 0 ? usdmAmount : usdmAmount.mul(mlpSupply).div(aumInUsdm);
        require(mintAmount >= _minMlp, Errors.MLPMANAGER_INSUFFICIENT_MLP_OUTPUT);
        IMintable(mlp).mint(_account, mintAmount);
        lastAddedAt[_account] = block.timestamp;
        emit Events.AddLiquidity(_account, _token, _amount, aumInUsdm, mlpSupply, usdmAmount, mintAmount);
        return mintAmount;
    }

    function _removeLiquidity(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) internal returns (uint256) {
        require(_mlpAmount > 0, Errors.MLPMANAGER_INVALID_MLPAMOUNT);
        require(lastAddedAt[_account].add(cooldownDuration) <= block.timestamp, Errors.MLPMANAGER_COOLDOWN_DURATION_NOT_YET_PASSED);
        uint256 aumInUsdm = getAumInUsdm(false);
        uint256 mlpSupply = IERC20(mlp).totalSupply();
        uint256 usdmAmount = _mlpAmount.mul(aumInUsdm).div(mlpSupply);
        uint256 usdmBalance = IERC20(usdm).balanceOf(address(this));
        if (usdmAmount > usdmBalance) {
            IUSDM(usdm).mint(address(this), usdmAmount.sub(usdmBalance));
        }
        IMintable(mlp).burn(_account, _mlpAmount);
        IERC20(usdm).transfer(address(vault), usdmAmount);
        uint256 amountOut = vault.sellUSDM(_tokenOut, _receiver);
        require(amountOut >= _minOut, Errors.MLPMANAGER_INSUFFICIENT_OUTPUT);
        emit Events.RemoveLiquidity(_account, _tokenOut, _mlpAmount, aumInUsdm, mlpSupply, usdmAmount, amountOut);
        return amountOut;
    }

    function _validateHandler() internal view {
        require(isHandler[msg.sender], Errors.MLPMANAGER_FORBIDDEN);
    }

    function getPrice(bool _maximise) external view returns (uint256) {
        uint256 aum = getAum(_maximise);
        uint256 supply = IERC20(mlp).totalSupply();
        return aum.mul(Constants.MLP_PRECISION).div(supply);
    }

    function getAums() public view returns (uint256[] memory) {
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = getAum(true);
        amounts[1] = getAum(false);
        return amounts;
    }

    function getAumInUsdm(bool maximise) public override view returns (uint256) {
        uint256 aum = getAum(maximise);
        return aum.mul(10 ** Constants.USDM_DECIMALS).div(Constants.PRICE_PRECISION);
    }

    function getAum(bool maximise) public view returns (uint256) {
        uint256 length = vault.allWhitelistedTokensLength();
        uint256 aum = aumAddition;
        uint256 shortProfits = 0;
        IVault _vault = vault;
        for (uint256 i = 0; i < length; i++) {
            address token = vault.allWhitelistedTokens(i);
            bool isWhitelisted = vault.whitelistedTokens(token);
            if (!isWhitelisted) {
                continue;
            }
            uint256 price = maximise ? _vault.getMaxPrice(token) : _vault.getMinPrice(token);
            uint256 poolAmount = _vault.poolAmounts(token);
            uint256 decimals = _vault.tokenDecimals(token);
            if (_vault.stableTokens(token)) {
                aum = aum.add(poolAmount.mul(price).div(10 ** decimals));
            } else {
                uint256 size = _vault.globalShortSizes(token);
                if (size > 0) {
                    (uint256 delta, bool hasProfit) = getGlobalShortDelta(token, price, size);
                    if (!hasProfit) {
                        aum = aum.add(delta);
                    } else {
                        shortProfits = shortProfits.add(delta);
                    }
                }
                aum = aum.add(_vault.guaranteedUsd(token));
                uint256 reservedAmount = _vault.reservedAmounts(token);
                aum = aum.add(poolAmount.sub(reservedAmount).mul(price).div(10 ** decimals));
            }
        }
        aum = shortProfits > aum ? 0 : aum.sub(shortProfits);
        return aumDeduction > aum ? 0 : aum.sub(aumDeduction);
    }

    function getGlobalShortDelta(address _token, uint256 _price, uint256 _size) public view returns (uint256, bool) {
        uint256 averagePrice = getGlobalShortAveragePrice(_token);
        uint256 priceDelta = averagePrice > _price ? averagePrice.sub(_price) : _price.sub(averagePrice);
        uint256 delta = _size.mul(priceDelta).div(averagePrice);
        return (delta, averagePrice > _price);
    }

    function getGlobalShortAveragePrice(address _token) public view returns (uint256) {
        IShortsTracker _shortsTracker = shortsTracker;
        if (address(_shortsTracker) == address(0) || !_shortsTracker.isGlobalShortDataReady()) {
            return vault.globalShortAveragePrices(_token);
        }
        uint256 _shortsTrackerAveragePriceWeight = shortsTrackerAveragePriceWeight;
        if (_shortsTrackerAveragePriceWeight == 0) {
            return vault.globalShortAveragePrices(_token);
        } else if (_shortsTrackerAveragePriceWeight == Constants.BASIS_POINTS_DIVISOR) {
            return _shortsTracker.globalShortAveragePrices(_token);
        }
        uint256 vaultAveragePrice = vault.globalShortAveragePrices(_token);
        uint256 shortsTrackerAveragePrice = _shortsTracker.globalShortAveragePrices(_token);
        return vaultAveragePrice.mul(Constants.BASIS_POINTS_DIVISOR.sub(_shortsTrackerAveragePriceWeight)).add(shortsTrackerAveragePrice.mul(_shortsTrackerAveragePriceWeight)).div(Constants.BASIS_POINTS_DIVISOR);
    }
}
