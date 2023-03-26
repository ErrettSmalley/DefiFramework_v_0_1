### 3.65 CVF-65

- Severity: Minor
- Status: Opened
- Source: VaultUtils.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`
2. `address _collateralToken` should be `IERC20`
3. `address _indexToken` should be `IERC20`



```
contracts/core/VaultUtils.sol:71

function getFeeBasisPoints(address _token, uint256 _usdmDelta, uint256 _feeBasisPoints, uint256 _taxBasisPoints, bool _increment) public override view returns (uint256) {
```



```
contracts/core/VaultUtils.sol:93

function getPosition(address _account, address _collateralToken, address _indexToken, bool _isLong) internal view returns (DataTypes.Position memory) {
```





### 3.66 CVF-66

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _vault` should be `IVault`

```
contracts/core/ShortsTracker.sol:5

constructor(address _vault) public {
```





### 3.67 CVF-67

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedStorage.sol
- Category: Procedural



**Description:**

We didn't review these files

```
contracts/core/storage/VaultPriceFeedStorage.sol:3 - 10

import "../../oracle/interfaces/IPriceFeed.sol";
import "../../oracle/interfaces/ISecondaryPriceFeed.sol";
import "../../oracle/interfaces/IChainlinkFlags.sol";
import "../../amm/interfaces/IPancakePair.sol";
import "../interfaces/IVaultPriceFeed.sol";
import "../../libraries/math/SafeMath.sol";
import "../../libraries/Errors.sol";
import "../../libraries/Constants.sol";
```





### 3.68 CVF-68

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedStorage.sol
- Category: Bad datatypes

**Recommendation:**

1. `address public btc` should be `IERC20`
2. `address public eth` should be `IERC20`
3. `address public bnb` should be `IERC20`
4. `address public bnbBusd` should be `IERC20`
5. `address public ethBnb` should be `IERC20`
6. `address public btcBnb` should be `IERC20`



```
contracts/core/storage/VaultPriceFeedStorage.sol:22 - 27

    address public btc;
    address public eth;
    address public bnb;
    address public bnbBusd;
    address public ethBnb;
    address public btcBnb;
```





### 3.69 CVF-69

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedStorage.sol
- Category: Bad datatypes

**Recommendation:**

1. `strictStableTokens` should use `IERC20` instead of `address`



```
contracts/core/storage/VaultPriceFeedStorage.sol:31

mapping (address => bool) public strictStableTokens;
```





### 3.70 CVF-70

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/VaultPriceFeedSettings.sol:11

function setAdjustment(address _token, bool _isAdditive, uint256 _adjustmentBps) external override onlyGov {
```



### 3.71 CVF-71

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Bad datatypes

**Recommendation**

1. `address _btc` should be `IERC20`
2. `address _eth` should be `IERC20`
3. `address _bnb` should be `IERC20`



```
contracts/core/settings/VaultPriceFeedSettings.sol:33

    function setTokens(address _btc, address _eth, address _bnb) external onlyGov {
        btc = _btc;
        eth = _eth;
        bnb = _bnb;
    }
```





### 3.72 CVF-72

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Bad datatypes

**Recommendation**

1. `address _bnbBusd` should be `IERC20`
2. `address _ethBnb` should be `IERC20`
3. `address _btcBnb` should be `IERC20`



```
contracts/core/settings/VaultPriceFeedSettings.sol:38

    function setPairs(address _bnbBusd, address _ethBnb, address _btcBnb) external onlyGov {
        bnbBusd = _bnbBusd;
        ethBnb = _ethBnb;
        btcBnb = _btcBnb;
    }
```



### 3.73 CVF-73

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`

```
contracts/core/settings/VaultPriceFeedSettings.sol:43

function setSpreadBasisPoints(address _token, uint256 _spreadBasisPoints) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:60

function setTokenConfig(address _token, address _priceFeed, uint256 _priceDecimals, bool _isStrictStable) external override onlyGov {
```





### 3.74 CVF-74

- Severity: Minor
- Status: Opened
- Source: VaultUtilsStorage.sol
- Category: Procedural

**Recommendation:**

We didn't review these files:

```
contracts/core/storage/VaultUtilsStorage.sol:3 - 11

import "../../libraries/math/SafeMath.sol";
import "../../libraries/token/IERC20.sol";
import "../../libraries/DataTypes.sol";
import "../../libraries/Errors.sol";
import "../../libraries/Constants.sol";
import "../interfaces/IShortsTracker.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IVaultUtils.sol";
import "../../access/Governable.sol";
```





### 3.75 CVF-75

- Severity: Minor
- Status: Opened
- Source: ShortsTrackerAggregator.sol
- Category: Procedural

**Recommendation:**

We didn't review these files:

```
contracts/core/storage/ShortsTrackerAggregator.sol:3 - 8

import "../interfaces/IVault.sol";
import "../interfaces/IShortsTracker.sol";
import "../../access/Governable.sol";
import "../../libraries/math/SafeMath.sol";
import "../../libraries/Events.sol";
import "../../libraries/Errors.sol";
```



### 3.76 CVF-76

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`

```
contracts/core/ShortsTracker.sol:8

function updateGlobalShortData(address _account, address _collateralToken, address _indexToken, bool _isLong, uint256 _sizeDelta, uint256 _markPrice, bool _isIncrease) override external onlyHandler {
```





### 3.77 CVF-77

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/ShortsTracker.sol:24

function _setGlobalShortAveragePrice(address _token, uint256 _averagePrice) internal {
```





### 3.78 CVF-78

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Bad datatypes

**Recommendation:**

1. `address[] calldata _tokens` should be `IERC20[]`



```
contracts/core/ShortsTracker.sol:30

function setInitData(address[] calldata _tokens, uint256[] calldata _averagePrices) external onlyGov {
```





### 3.79 CVF-79

- Severity: Status
- Status: Opened
- Source: ShortsTracker.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/ShortsTracker.sol:38

function getGlobalShortDelta(address _token) public view returns (bool, uint256) {
```





### 3.80 CVF-80

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`

```
contracts/core/ShortsTracker.sol:48

function getNextGlobalShortData(address _account, address _collateralToken, address _indexToken, uint256 _nextPrice, uint256 _sizeDelta, bool _isIncrease) override public view returns (uint256, uint256) {
```



```
contracts/core/ShortsTracker.sol:68

function getRealisedPnl(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isIncrease) public view returns (int256) {
```





### 3.81 CVF-81

- Severity: Minor
- Status: Opened
- Source: OrderBookAggregators.sol
- Category: Procedural

**Recommendation:**

We didn't review these files:

```
contracts/core/storage/OrderBookAggregators.sol:3 - 15

import "../../tokens/interfaces/IWETH.sol";
import "../../libraries/math/SafeMath.sol";
import "../../libraries/token/IERC20.sol";
import "../../libraries/token/SafeERC20.sol";
import "../../libraries/utils/Address.sol";
import "../../libraries/utils/ReentrancyGuard.sol";
import "../../libraries/DataTypes.sol";
import "../../libraries/Errors.sol";
import "../../libraries/Constants.sol";
import "../../libraries/Events.sol";
import "../interfaces/IRouter.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IOrderBook.sol";
```



### 3.82 CVF-82

- Severity: Minor
- Status: Opened
- Source: OrderBookStorage.sol
- Category: Bad datatypes

**Recommendatioin:**

1. `address public weth;` should be `IERC20`
2. `address public usdm;`should be `IERC20`



```
contracts/core/storage/OrderBookStorage.sol:9 - 10

    address public weth;
    address public usdm;
```



### 3.83 CVF-83

- Severity: Minor
- Status: Opened
- Source: OrderBookStorage.sol
- Category: Bad datatypes

**Recommendation:**

1. `address public router;` should be `IRouter`
2. `address public vault;` should be `IVault`



```
contracts/core/storage/OrderBookStorage.sol:11

    address public router;
    address public vault;
```





### 3.84 CVF-84

- Severity: Minor
- Status: Opened
- Source: OrderBookSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _otherToken` should be `IERC20`



```
contracts/core/settings/OrderBookSettings.sol:21

function getUsdmMinPrice(address _otherToken) public view returns (uint256) {
```



### 3.85 CVF-85

- Severity: Minor
- Status: Opened
- Source: OrderBookSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _tokenIn` should be `IERC20`
2. `address _tokenOut` should be `IERC20`



```
contracts/core/settings/OrderBookSettings.sol:56

function _vaultSwap(address _tokenIn, address _tokenOut, uint256 _minOut, address _receiver) internal returns (uint256) {
```



### 3.86 CVF-86

- Severity: Minor
- Status: Opened
- Source: OrderBookSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address[] memory _path` should be `IERC20[]`



```
contracts/core/settings/OrderBookSettings.sol:68

function _createSwapOrder(address _account, address[] memory _path, uint256 _amountIn, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold, bool _shouldUnwrap, uint256 _executionFee) internal {
```



### 3.87 CVF-87

- Severity: Minor
- Status: Opened
- Source: OrderBookSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/settings/OrderBookSettings.sol:75

function _createDecreaseOrder(address _account, address _collateralToken, uint256 _collateralDelta, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold) internal {
```



### 3.88 CVF-88

- Severity: Minor
- Status: Opened
- Source: OrderBookSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _purchaseToken` should be `IERC20`
2. `address _collateralToken` should be `IERC20`
3. `address _indexToken` should be `IERC20`



```
contracts/core/settings/OrderBookSettings.sol:82

function _createIncreaseOrder(address _account, address _purchaseToken, uint256 _purchaseTokenAmount, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold, uint256 _executionFee) internal {
```





### 3.89 CVF-89

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _router` should be `IRouter`
2. `address _vault` should be `IVault`
3. `address _weth` should be `IERC20`
4. `address _usdm` should be `IERC20`



```
contracts/core/OrderBook.sol:8

function initialize(address _router, address _vault, address _weth, address _usdm, uint256 _minExecutionFee, uint256 _minPurchaseTokenAmountUsd) external onlyGov {
```



```
contracts/core/OrderBook.sol:11

        router = _router;
        vault = _vault;
        weth = _weth;
        usdm = _usdm;
```



### 3.90 CVF-90

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Bad datatypes

**Recommendations:**

1. `address[] memory _path` should be `IERC20[]`

```
contracts/core/OrderBook.sol:23

function createSwapOrder(address[] memory _path, uint256 _amountIn, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap, bool _shouldUnwrap) external payable nonReentrant {
```





### 3.91 CVF-91

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Bad datatypes

**Recommendation:**

1. `address[] memory _path` should be `IERC20[]`
2. `address _indexToken` should be `IERC20`
3. `address _collateralToken` should be `IERC20`

```
contracts/core/OrderBook.sol:80

function createIncreaseOrder(address[] memory _path, uint256 _amountIn, address _indexToken, uint256 _minOut, uint256 _sizeDelta, address _collateralToken, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap) external payable nonReentrant {
```



### 3.92 CVF-92

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _indexToken` should be `IERC20`
2. `address _collateralToken` should be `IERC20`



```
contracts/core/OrderBook.sol:143

function createDecreaseOrder(address _indexToken, uint256 _sizeDelta, address _collateralToken, uint256 _collateralDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold) external payable nonReentrant {
```



### 3.93 CVF-93

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Bad datatypes

**Recommendation:**

1. `address[] memory _path` should be `IERC20[]`



```
contracts/core/OrderBook.sol:179

function validateSwapOrderPriceWithTriggerAboveThreshold(address[] memory _path, uint256 _triggerRatio) public view returns (bool) {
```



### 3.94 CVF-94

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _indexToken` should be `IERC20`



```
contracts/core/OrderBook.sol:199

function validatePositionOrderPrice(bool _triggerAboveThreshold, uint256 _triggerPrice, address _indexToken, bool _maximizePrice, bool _raise) public view returns (uint256, bool) {
```



### 3.95 CVF-95

- Severity: Minor
- Status: Opened
- Source: MlpManagerAggregators.sol
- Category: Procedural

**Recommendation:**

1. We didn't review these files

```
contracts/core/storage/MlpManagerAggregators.sol:3 - 14

import "../../libraries/math/SafeMath.sol";
import "../../libraries/token/IERC20.sol";
import "../../libraries/token/SafeERC20.sol";
import "../../libraries/Events.sol";
import "../../libraries/Errors.sol";
import "../../libraries/utils/ReentrancyGuard.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IShortsTracker.sol";
import "../interfaces/IMlpManager.sol";
import "../../tokens/interfaces/IUSDM.sol";
import "../../tokens/interfaces/IMintable.sol";
import "../../access/Governable.sol";
```



### 3.96 CVF-96

- Severity: Minor
- Status: Opened
- Source: MlpManagerStorage.sol
- Category: Bad datatypes

**Recommendation:**

1. `address public mlp;` should be `IMlpManager`



```
contracts/core/storage/MlpManagerStorage.sol:19

address public mlp;
```



### 3.97 CVF-97

- Severity: Minor
- Status: Opened
- Source: MlpManagerStorage.sol
- Category: Bad datatypes

**Recommendation:**

1. `address public override usdm;` should be `IERC20`



```
contracts/core/storage/MlpManagerStorage.sol:20

address public override usdm;
```







### 3.98 CVF-98

- Severity: Minor
- Status: Opened
- Source: MlpManagerStorage.sol
- Category: Bad datatypes

**Recommendation:**

1. `mapping (address => bool) public isHandler;` should be `IHandler`



```
contracts/core/storage/MlpManagerStorage.sol:21

mapping (address => bool) public isHandler;
```





### 3.99 CVF-99

- Severity: Minor
- Status: Opened
- Source: MlpManagerStorage.sol
- Category: Bad datatypes

**Recommendation:**

1. `mapping (address => uint256) public override lastAddedAt;` should be `IERC20`



```
contracts/core/storage/MlpManagerStorage.sol:22

mapping (address => uint256) public override lastAddedAt;
```













































