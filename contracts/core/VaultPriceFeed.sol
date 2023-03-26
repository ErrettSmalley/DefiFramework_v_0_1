// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./settings/VaultPriceFeedSettings.sol";
contract VaultPriceFeed is VaultPriceFeedSettings {
    constructor() public {
        gov = msg.sender;
    }
    function getPrice(
        address _token,
        bool _maximise,
        bool _includeAmmPrice, bool) public override view returns (uint256) {
        uint256 price = useV2Pricing ? getPriceV2(_token, _maximise, _includeAmmPrice) : getPriceV1(_token, _maximise, _includeAmmPrice);
        uint256 adjustmentBps = adjustmentBasisPoints[_token];
        if (adjustmentBps > 0) {
            bool isAdditive = isAdjustmentAdditive[_token];
            if (isAdditive) {
                price = price.mul(Constants.BASIS_POINTS_DIVISOR.add(adjustmentBps)).div(Constants.BASIS_POINTS_DIVISOR);
            } else {
                price = price.mul(Constants.BASIS_POINTS_DIVISOR.sub(adjustmentBps)).div(Constants.BASIS_POINTS_DIVISOR);
            }
        }
        return price;
    }
    function getPriceV1(
        address _token,
        bool _maximise,
        bool _includeAmmPrice) public view returns (uint256) {
        uint256 price = getPrimaryPrice(_token, _maximise);
        if (_includeAmmPrice && isAmmEnabled) {
            uint256 ammPrice = getAmmPrice(_token);
            if (ammPrice > 0) {
                if (_maximise && ammPrice > price) {
                    price = ammPrice;
                }
                if (!_maximise && ammPrice < price) {
                    price = ammPrice;
                }
            }
        }
        if (isSecondaryPriceEnabled) {
            price = getSecondaryPrice(_token, price, _maximise);
        }
        if (strictStableTokens[_token]) {
            uint256 delta = price > Constants.ONE_USD ? price.sub(Constants.ONE_USD) : Constants.ONE_USD.sub(price);
            if (delta <= maxStrictPriceDeviation) {
                return Constants.ONE_USD;
            }
            if (_maximise && price > Constants.ONE_USD) {
                return price;
            }
            if (!_maximise && price < Constants.ONE_USD) {
                return price;
            }
            return Constants.ONE_USD;
        }
        uint256 _spreadBasisPoints = spreadBasisPoints[_token];
        if (_maximise) {
            return price.mul(Constants.BASIS_POINTS_DIVISOR.add(_spreadBasisPoints)).div(Constants.BASIS_POINTS_DIVISOR);
        }
        return price.mul(Constants.BASIS_POINTS_DIVISOR.sub(_spreadBasisPoints)).div(Constants.BASIS_POINTS_DIVISOR);
    }
    function getPriceV2(
        address _token,
        bool _maximise,
        bool _includeAmmPrice) public view returns (uint256) {
        uint256 price = getPrimaryPrice(_token, _maximise);
        if (_includeAmmPrice && isAmmEnabled) {
            price = getAmmPriceV2(_token, _maximise, price);
        }
        if (isSecondaryPriceEnabled) {
            price = getSecondaryPrice(_token, price, _maximise);
        }
        if (strictStableTokens[_token]) {
            uint256 delta = price > Constants.ONE_USD ? price.sub(Constants.ONE_USD) : Constants.ONE_USD.sub(price);
            if (delta <= maxStrictPriceDeviation) {
                return Constants.ONE_USD;
            }
            if (_maximise && price > Constants.ONE_USD) {
                return price;
            }
            if (!_maximise && price < Constants.ONE_USD) {
                return price;
            }
            return Constants.ONE_USD;
        }
        uint256 _spreadBasisPoints = spreadBasisPoints[_token];
        if (_maximise) {
            return price.mul(Constants.BASIS_POINTS_DIVISOR.add(_spreadBasisPoints)).div(Constants.BASIS_POINTS_DIVISOR);
        }
        return price.mul(Constants.BASIS_POINTS_DIVISOR.sub(_spreadBasisPoints)).div(Constants.BASIS_POINTS_DIVISOR);
    }
    function getAmmPriceV2(
        address _token,
        bool _maximise,
        uint256 _primaryPrice) public view returns (uint256) {
        uint256 ammPrice = getAmmPrice(_token);
        if (ammPrice == 0) {
            return _primaryPrice;
        }
        uint256 diff = ammPrice > _primaryPrice ? ammPrice.sub(_primaryPrice) : _primaryPrice.sub(ammPrice);
        if (diff.mul(Constants.BASIS_POINTS_DIVISOR) < _primaryPrice.mul(spreadThresholdBasisPoints)) {
            if (favorPrimaryPrice) {
                return _primaryPrice;
            }
            return ammPrice;
        }
        if (_maximise && ammPrice > _primaryPrice) {
            return ammPrice;
        }
        if (!_maximise && ammPrice < _primaryPrice) {
            return ammPrice;
        }
        return _primaryPrice;
    }
    function getLatestPrimaryPrice(address _token) public override view returns (uint256) {
        address priceFeedAddress = priceFeeds[_token];
        require(priceFeedAddress != address(0), Errors.VAULTPRICEFEED_INVALID_PRICE_FEED);
        IPriceFeed priceFeed = IPriceFeed(priceFeedAddress);
        int256 price = priceFeed.latestAnswer();
        require(price > 0, Errors.VAULTPRICEFEED_INVALID_PRICE);
        return uint256(price);
    }
    function getPrimaryPrice(
        address _token,
        bool _maximise) public override view returns (uint256) {
        address priceFeedAddress = priceFeeds[_token];
        require(priceFeedAddress != address(0), Errors.VAULTPRICEFEED_INVALID_PRICE_FEED);
        if (chainlinkFlags != address(0)) {
            bool isRaised = IChainlinkFlags(chainlinkFlags).getFlag(Constants.FLAG_ARBITRUM_SEQ_OFFLINE);
            if (isRaised) {
                revert(Errors.CHAINLINK_FEEDS_ARE_NOT_BEING_UPDATED);
            }
        }
        IPriceFeed priceFeed = IPriceFeed(priceFeedAddress);
        uint256 price = 0;
        uint80 roundId = priceFeed.latestRound();
        for (uint80 i = 0; i < priceSampleSpace; i++) {
            if (roundId <= i) { break; }
            uint256 p;
            if (i == 0) {
                int256 _p = priceFeed.latestAnswer();
                require(_p > 0, Errors.VAULTPRICEFEED_INVALID_PRICE);
                p = uint256(_p);
            } else {
                (, int256 _p, , ,) = priceFeed.getRoundData(roundId - i);
                require(_p > 0, Errors.VAULTPRICEFEED_INVALID_PRICE);
                p = uint256(_p);
            }
            if (price == 0) {
                price = p;
                continue;
            }
            if (_maximise && p > price) {
                price = p;
                continue;
            }
            if (!_maximise && p < price) {
                price = p;
            }
        }
        require(price > 0, Errors.VAULTPRICEFEED_COULD_NOT_FETCH_PRICE);
        uint256 _priceDecimals = priceDecimals[_token];
        return price.mul(Constants.PRICE_PRECISION).div(10 ** _priceDecimals);
    }
    function getSecondaryPrice(
        address _token,
        uint256 _referencePrice,
        bool _maximise) public view returns (uint256) {
        if (secondaryPriceFeed == address(0)) { return _referencePrice; }
        return ISecondaryPriceFeed(secondaryPriceFeed).getPrice(_token, _referencePrice, _maximise);
    }
    function getAmmPrice(address _token) public override view returns (uint256) {
        if (_token == bnb) {
            return getPairPrice(bnbBusd, true);
        }
        if (_token == eth) {
            uint256 price0 = getPairPrice(bnbBusd, true);
            uint256 price1 = getPairPrice(ethBnb, true);
            return price0.mul(price1).div(Constants.PRICE_PRECISION);
        }
        if (_token == btc) {
            uint256 price0 = getPairPrice(bnbBusd, true);
            uint256 price1 = getPairPrice(btcBnb, true);
            return price0.mul(price1).div(Constants.PRICE_PRECISION);
        }
        return 0;
    }
    function getPairPrice(address _pair, bool _divByReserve0) public view returns (uint256) {
        (uint256 reserve0, uint256 reserve1, ) = IPancakePair(_pair).getReserves();
        if (_divByReserve0) {
            if (reserve0 == 0) { return 0; }
            return reserve1.mul(Constants.PRICE_PRECISION).div(reserve0);
        }
        if (reserve1 == 0) { return 0; }
        return reserve0.mul(Constants.PRICE_PRECISION).div(reserve1);
    }
}
