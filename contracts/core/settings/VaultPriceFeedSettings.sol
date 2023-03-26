// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "../storage/VaultPriceFeedStorage.sol";
abstract contract VaultPriceFeedSettings is VaultPriceFeedStorage {
    function setGov(address _gov) external onlyGov {
        gov = _gov;
    }
    function setChainlinkFlags(address _chainlinkFlags) external onlyGov {
        chainlinkFlags = _chainlinkFlags;
    }
    function setAdjustment(address _token, bool _isAdditive, uint256 _adjustmentBps) external override onlyGov {
        require(
            lastAdjustmentTimings[_token].add(Constants.MAX_ADJUSTMENT_INTERVAL) < block.timestamp,
            Errors.VAULTPRICEFEED_ADJUSTMENT_FREQUENCY_EXCEEDED
        );
        require(_adjustmentBps <= Constants.MAX_ADJUSTMENT_BASIS_POINTS, Errors.VAULTPRICEFEED_INVALID_ADJUSTMENTBPS);
        isAdjustmentAdditive[_token] = _isAdditive;
        adjustmentBasisPoints[_token] = _adjustmentBps;
        lastAdjustmentTimings[_token] = block.timestamp;
    }
    function setUseV2Pricing(bool _useV2Pricing) external override onlyGov {
        useV2Pricing = _useV2Pricing;
    }
    function setIsAmmEnabled(bool _isEnabled) external override onlyGov {
        isAmmEnabled = _isEnabled;
    }

    function setIsSecondaryPriceEnabled(bool _isEnabled) external override onlyGov {
        isSecondaryPriceEnabled = _isEnabled;
    }
    function setSecondaryPriceFeed(address _secondaryPriceFeed) external onlyGov {
        secondaryPriceFeed = _secondaryPriceFeed;
    }
    function setTokens(address _btc, address _eth, address _bnb) external onlyGov {
        btc = _btc;
        eth = _eth;
        bnb = _bnb;
    }
    function setPairs(address _bnbBusd, address _ethBnb, address _btcBnb) external onlyGov {
        bnbBusd = _bnbBusd;
        ethBnb = _ethBnb;
        btcBnb = _btcBnb;
    }
    function setSpreadBasisPoints(address _token, uint256 _spreadBasisPoints) external override onlyGov {
        require(_spreadBasisPoints <= Constants.MAX_SPREAD_BASIS_POINTS, Errors.VAULTPRICEFEED_INVALID_SPREADBASISPOINTS);
        spreadBasisPoints[_token] = _spreadBasisPoints;
    }

    function setSpreadThresholdBasisPoints(uint256 _spreadThresholdBasisPoints) external override onlyGov {
        spreadThresholdBasisPoints = _spreadThresholdBasisPoints;
    }
    function setFavorPrimaryPrice(bool _favorPrimaryPrice) external override onlyGov {
        favorPrimaryPrice = _favorPrimaryPrice;
    }
    function setPriceSampleSpace(uint256 _priceSampleSpace) external override onlyGov {
        require(_priceSampleSpace > 0, Errors.VAULTPRICEFEED_INVALID_PRICESAMPLESPACE);
        priceSampleSpace = _priceSampleSpace;
    }
    function setMaxStrictPriceDeviation(uint256 _maxStrictPriceDeviation) external override onlyGov {
        maxStrictPriceDeviation = _maxStrictPriceDeviation;
    }
    function setTokenConfig(address _token, address _priceFeed, uint256 _priceDecimals, bool _isStrictStable) external override onlyGov {
        priceFeeds[_token] = _priceFeed;
        priceDecimals[_token] = _priceDecimals;
        strictStableTokens[_token] = _isStrictStable;
    }
}
