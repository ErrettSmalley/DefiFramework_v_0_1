### 3.145 CVF-145

- Severity: MInor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Unclear behavior

**Recommendation:**

The function should have an event log



```
contracts/core/ShortsTracker.sol:20

function setHandler(address _handler, bool _isActive) external onlyGov {
```



```
contracts/core/ShortsTracker.sol:24

function _setGlobalShortAveragePrice(address _token, uint256 _averagePrice) internal {
```



### 3.146 CVF-146

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Unclear behavior

**Recommendation:**

The function should have an event log



```
contracts/core/ShortsTracker.sol:27

function setIsGlobalShortDataReady(bool value) external onlyGov {
```



```
contracts/core/ShortsTracker.sol:30

function setInitData(address[] calldata _tokens, uint256[] calldata _averagePrices) external onlyGov {
```



### 3.147 CVF-147

- Severity: Minor
- Status: Opened
- Source: RouterSettings.sol
- Category: Unclear behavior

**Recommendation:**

1. The function should have an event log



```
contracts/core/settings/RouterSettings.sol:59

function setGov(address _gov) external onlyGov {
```



### 3.148 CVF-148

- Severity: Minor
- Status: Opened
- Source: Router.sol
- Category: Unclear behavior



**Recommendation:**

The function should have an event log



```
contracts/core/Router.sol:14

function addPlugin(address _plugin) external override onlyGov {
```



```
contracts/core/Router.sol:17

function removePlugin(address _plugin) external onlyGov {
```



```
contracts/core/Router.sol:20

function approvePlugin(address _plugin) external {
```



```
contracts/core/Router.sol:23

function denyPlugin(address _plugin) external {
```



### 3.149 CVF-149

- Severity: Minor
- Status: Opened
- Source: Router.sol
- Category: Unclear behavior



**Recommendation:**

The function should have an event log



```
contracts/core/Router.sol:26

function pluginTransfer(address _token, address _account, address _receiver, uint256 _amount) external override {
```



```
contracts/core/Router.sol:30

function pluginIncreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong) external override {
```



```
contracts/core/Router.sol:34

function pluginDecreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver) external override returns (uint256) {
```



```
contracts/core/Router.sol:38

function directPoolDeposit(address _token, uint256 _amount) external {
```



### 3.150 CVF-150

- Severity: Minor
- Status: Opened
- Source: Router.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should have an event log



```
contracts/core/Router.sol:60

function increasePosition(address[] memory _path, address _indexToken, uint256 _amountIn, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external {
```



```
contracts/core/Router.sol:70

function increasePositionETH(address[] memory _path, address _indexToken, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external payable {
```



```
contracts/core/Router.sol:81

function decreasePosition(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price) external {
```



```
contracts/core/Router.sol:84

function decreasePositionETH(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address payable _receiver, uint256 _price) external {
```



```
contracts/core/Router.sol:88

function decreasePositionAndSwap(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price, uint256 _minOut) external {
```



```
contracts/core/Router.sol:93

function decreasePositionAndSwapETH(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address payable _receiver, uint256 _price, uint256 _minOut) external {
```



### 3.151 CVF-151

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should have an event log

```
contracts/core/PositionManager.sol:9

function increasePosition(address[] memory _path, address _indexToken, uint256 _amountIn, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external nonReentrant onlyPartnersOrOpened {
```



```
contracts/core/PositionManager.sol:23

function increasePositionETH(address[] memory _path, address _indexToken, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external payable nonReentrant onlyPartnersOrOpened {
```



```
contracts/core/PositionManager.sol:38

function decreasePosition(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price, uint256 _minOut, bool _withdrawETH) external nonReentrant onlyPartnersOrOpened {
```



```
contracts/core/PositionManager.sol:54

function liquidatePosition(address _account, address _collateralToken, address _indexToken, bool _isLong, address _feeReceiver) external nonReentrant onlyLiquidator {
```



### 3.152 CVF-152

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol

**Recommendation:**

1. The function should have an event log



```
contracts/core/PositionManager.sol:64

function executeSwapOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) external onlyOrderKeeper {
```





```
contracts/core/PositionManager.sol:67

function executeIncreaseOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) external onlyOrderKeeper {
```



```
contracts/core/PositionManager.sol:79

function executeDecreaseOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) external onlyOrderKeeper {
```



### 3.153 CVF-153

- Severity: Minor
- Status: Opened
- Source: BasePositionManager.sol
- Category: Unclear behavior



**Recommendation:**

The function should have an event log



```
contracts/core/BasePositionManager.sol:20

function approve(address _token, address _spender, uint256 _amount) external onlyGov {
```



```
contracts/core/BasePositionManager.sol:23

function sendValue(address payable _receiver, uint256 _amount) external onlyGov {
```



### 3.154 CVF-154

- Severity: Minor
- Status: Opened
- Source: MlpManagerSettings.sol
- Category: Unclear behavior



**Recommendation:**

The function should have an event log



```
contracts/core/settings/MlpManagerSettings.sol:5

function setInPrivateMode(bool _inPrivateMode) external onlyGov {
```



```
contracts/core/settings/MlpManagerSettings.sol:8

function setShortsTrackerAveragePriceWeight(uint256 _shortsTrackerAveragePriceWeight) external onlyGov {
```



```
contracts/core/settings/MlpManagerSettings.sol:12

function setHandler(address _handler, bool _isActive) external onlyGov {
```



```
contracts/core/settings/MlpManagerSettings.sol:15

function setCooldownDuration(uint256 _cooldownDuration) external onlyGov {
```



```
contracts/core/settings/MlpManagerSettings.sol:19

function setAumAdjustment(uint256 _aumAddition, uint256 _aumDeduction) external onlyGov {
```



### 3.155 CVF-155

- Severity: Minor
- Status: Opened
- Source: MlpManager.sol
- Category: Unclear behavior



**Recommendation:**

The function should have an event log



```
contracts/core/MlpManager.sol:13

function addLiquidity(address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {
```



```
contracts/core/MlpManager.sol:17

function addLiquidityForAccount(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {
```



```
contracts/core/MlpManager.sol:21

function removeLiquidity(address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {
```



```
contracts/core/MlpManager.sol:25

function removeLiquidityForAccount(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {
```



### 3.156 CVF-156

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Unclear behavior



**Recommendation:**

The function should have an event log



```
contracts/core/OrderBook.sol:23

function createSwapOrder(address[] memory _path, uint256 _amountIn, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap, bool _shouldUnwrap) external payable nonReentrant {
```



```
contracts/core/OrderBook.sol:80

function createIncreaseOrder(address[] memory _path, uint256 _amountIn, address _indexToken, uint256 _minOut, uint256 _sizeDelta, address _collateralToken, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap) external payable nonReentrant {
```



```
contracts/core/OrderBook.sol:143

function createDecreaseOrder(address _indexToken, uint256 _sizeDelta, address _collateralToken, uint256 _collateralDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold) external payable nonReentrant {
```



```
contracts/core/OrderBook.sol:208

function cancelMultiple(uint256[] memory _swapOrderIndexes, uint256[] memory _increaseOrderIndexes, uint256[] memory _decreaseOrderIndexes) external {
```





### 3.157 CVF-157

- Severity: Minor
- Status: Opened
- Source: VaultUtils.sol
- Category: Suboptimal



**Recommendation:**

1. The below function is empty



```
contracts/core/VaultUtils.sol:11

function validateIncreasePosition(address,address,address,uint256,bool) external override view {
    }
```



### 3.158 CVF-158

- Severity: Minor
- Status: Opened
- Source: VaultUtils
- Category: Suboptimal



**Recommendation:**

1. The below function is empty



```
contracts/core/VaultUtils.sol:13

    function validateDecreasePosition(address,address,address,uint256,uint256,bool,address) external override view {
    }
```





### 3.159 CVF-159

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant.



```
contracts/core/settings/VaultPriceFeedSettings.sol:54

require(_priceSampleSpace > 0, Errors.VAULTPRICEFEED_INVALID_PRICESAMPLESPACE);
```



### 3.160 CVF-160

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeed.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant.



```
contracts/core/VaultPriceFeed.sol:105

require(priceFeedAddress != address(0), Errors.VAULTPRICEFEED_INVALID_PRICE_FEED);
```





### 3.161 CVF-161

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeed.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/VaultPriceFeed.sol:113

require(priceFeedAddress != address(0), Errors.VAULTPRICEFEED_INVALID_PRICE_FEED);
```



### 3.162 CVF-162

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeed.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/VaultPriceFeed.sol:152

if (secondaryPriceFeed == address(0)) { return _referencePrice; }
```



### 3.163 CVF-163

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Suboptimal

**Recommendation:**

1. The function should be `modifiers`



```
contracts/core/settings/VaultSettings.sol:9

_onlyGov();
```



### 3.164 CVF-164

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Suboptimal



**Recommendation:**

1. The function `_onlyGov` should be `modifiers`



```
contracts/core/Vault.sol:10

_onlyGov();
```



### 3.165 CVF-165

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/ShortsTracker.sol:21

require(_handler != address(0), Errors.SHORTSTRACKER_INVALID_HANDLER);
```



### 3.166 CVF-166

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The check is redundant

```
contracts/core/OrderBook.sol:40

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```



### 3.167 CVF-167

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The check is redundant



```
contracts/core/OrderBook.sol:61

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```



### 3.168 CVF-168

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/OrderBook.sol:69

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```





### 3.169 CVF-169

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant.



```
contracts/core/OrderBook.sol:107

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```





### 3.170 CVF-170

- Severity: MInor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/OrderBook.sol:124

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```



### 3.171 CVF-171

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/OrderBook.sol:132

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```



### 3.172 CVF-172

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/OrderBook.sol:150

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```



### 3.173 CVF-173

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/OrderBook.sol:164

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```



### 3.174 CVF-174

- Severity: Minor
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Recommendation:**

1. The below check is redundant



```
contracts/core/OrderBook.sol:173

require(order.account != address(0), Errors.ORDERBOOK_NON_EXISTENT_ORDER);
```



### 3.175 CVF-175

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedStorage.sol
- Category: Documentation

**Recommendation**

1. The mapping variable is unclear, suggest adding comments on it.



```
contracts/core/storage/VaultPriceFeedStorage.sol:28

mapping (address => address) public priceFeeds;
```



### 3.176 CVF-176

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedStorage.sol
- Category: Documentation



**Recommendation:**

1. The mapping variable is unclear, suggest adding comments on it.

```
contracts/core/storage/VaultPriceFeedStorage.sol:29 - 34

    mapping (address => uint256) public priceDecimals;
    mapping (address => uint256) public spreadBasisPoints;
    mapping (address => bool) public strictStableTokens;
    mapping (address => uint256) public override adjustmentBasisPoints;
    mapping (address => bool) public override isAdjustmentAdditive;
    mapping (address => uint256) public lastAdjustmentTimings;
```



### 3.177 CVF-177

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeed.sol
- Category: Documentation



**Recommendation:**

1. The public function is unclear, suggest adding comments on it.



```
contracts/core/VaultPriceFeed.sol:8

function getPrice(address _token, bool _maximise, bool _includeAmmPrice, bool) public override view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:21

function getPriceV1(address _token, bool _maximise, bool _includeAmmPrice) public view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:56

function getPriceV2(address _token, bool _maximise, bool _includeAmmPrice) public view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:83

function getAmmPriceV2(address _token, bool _maximise, uint256 _primaryPrice) public view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:103

function getLatestPrimaryPrice(address _token) public override view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:111

function getPrimaryPrice(address _token, bool _maximise) public override view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:151

function getSecondaryPrice(address _token, uint256 _referencePrice, bool _maximise) public view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:155

function getAmmPrice(address _token) public override view returns (uint256) {
```



```
contracts/core/VaultPriceFeed.sol:171

function getPairPrice(address _pair, bool _divByReserve0) public view returns (uint256) {
```



### 3.178 CVF-178

- Severity: Minor
- Status: Opened
- Source: VaultUtils.sol
- Category: Documentation

**Recommendation**

1. The function definition is unclear, suggest adding comments on it.



```
contracts/core/VaultUtils.sol:15

function validateLiquidation(address _account, address _collateralToken, address _indexToken, bool _isLong, bool _raise) public view override returns (uint256, uint256) {
```



```
function getEntryFundingRate(address _collateralToken,address, bool) public override view returns (uint256) {
function getPositionFee(address,address,address,bool,uint256 _sizeDelta) public override view returns (uint256) 
function getFundingFee(address, address _collateralToken, address,bool,uint256 _size, uint256 _entryFundingRate) public override view returns (uint256) {

function getBuyUsdmFeeBasisPoints(address _token, uint256 _usdmAmount) public override view returns (uint256) {
function getSellUsdmFeeBasisPoints(address _token, uint256 _usdmAmount) public override view returns (uint256) {
function getSwapFeeBasisPoints(address _tokenIn, address _tokenOut, uint256 _usdmAmount) public override view returns (uint256) {
function getFeeBasisPoints(address _token, uint256 _usdmDelta, uint256 _feeBasisPoints, uint256 _taxBasisPoints, bool _increment) public override view returns (uint256) {

function getPosition(address _account, address _collateralToken, address _indexToken, bool _isLong) internal view returns (DataTypes.Position memory) {
```





### 3.179 CVF-179

- Severity: Minor
- Status: Opened
- Source: VaultStorage.sol
- Category: Documentation

**Recommendation:**

1. The mapping variable definition is unclear, suggest adding comments on it.



```
contracts/core/storage/VaultStorage.sol:35

    mapping (address => mapping (address => bool)) public override approvedRouters;
    mapping (address => bool) public override isLiquidator;
    mapping (address => bool) public override isManager;
    mapping (address => bool) public override whitelistedTokens;
    mapping (address => uint256) public override tokenDecimals;
    mapping (address => uint256) public override minProfitBasisPoints;
    mapping (address => bool) public override stableTokens;
    mapping (address => bool) public override shortableTokens;
    mapping (address => uint256) public override tokenBalances;
    mapping (address => uint256) public override tokenWeights;
    mapping (address => uint256) public override usdmAmounts; //todo
    mapping (address => uint256) public override maxUsdmAmounts;
    mapping (address => uint256) public override poolAmounts; //todo: avaiable funds
    mapping (address => uint256) public override reservedAmounts; // all debt - amount
    mapping (address => uint256) public override bufferAmounts;
    mapping (address => uint256) public override guaranteedUsd; // long debt - usd
    mapping (address => uint256) public override cumulativeFundingRates;  // borrow fee
    mapping (address => uint256) public override lastFundingTimes;
    mapping (bytes32 => DataTypes.Position) public positions; //done
    mapping (address => uint256) public override feeReserves; // fee token=>balance
    mapping (address => uint256) public override globalShortSizes; // short debt = usd
    mapping (address => uint256) public override globalShortAveragePrices;
    mapping (address => uint256) public override maxGlobalShortSizes;
    mapping (uint256 => string) public errors;
```



### 3.180 CVF-180

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Documentation

**Recommendation:**

1. The function definition is unclear, suggest adding comments on it.



```
contracts/core/settings/VaultSettings.sol:147

function usdToTokenMin(address _token, uint256 _usdAmount) public view returns (uint256) {
function usdToTokenMax(address _token, uint256 _usdAmount) public view returns (uint256) {
function tokenToUsdMin(address _token, uint256 _tokenAmount) public override view returns (uint256) {
function usdToToken(address _token, uint256 _usdAmount, uint256 _price) public view returns (uint256) {

function adjustForDecimals(uint256 _amount, address _tokenDiv, address _tokenMul) public view returns (uint256) 
function allWhitelistedTokensLength() external override view returns (uint256) {
function validateLiquidation(address _account, address _collateralToken, address _indexToken, bool _isLong, bool _raise) override public view returns (uint256, uint256) {

function getMaxPrice(address _token) public override view returns (uint256) {
function getPositionFee(address _account, address _collateralToken, address _indexToken, bool _isLong, uint256 _sizeDelta) public view returns (uint256) {

function getFundingFee(address _account, address _collateralToken, address _indexToken, bool _isLong, uint256 _size, uint256 _entryFundingRate) public view returns (uint256) {

function getMinPrice(address _token) public override view returns (uint256) {

function getDelta(address _indexToken, uint256 _size, uint256 _averagePrice, bool _isLong, uint256 _lastIncreasedTime) public override view returns (bool, uint256) {

function getPositionKey(address _account, address _collateralToken, address _indexToken, bool _isLong) public pure returns (bytes32) {

function getPosition(address _account, address _collateralToken, address _indexToken, bool _isLong) public override view returns (uint256, uint256, uint256, uint256, uint256, uint256, bool, uint256) {

function getRedemptionCollateral(address _token) public view returns (uint256) {

function getRedemptionCollateralUsd(address _token) public view returns (uint256) {

function getRedemptionAmount(address _token, uint256 _usdmAmount) public override view returns (uint256) {

function getFeeBasisPoints(address _token, uint256 _usdmDelta, uint256 _feeBasisPoints, uint256 _taxBasisPoints, bool _increment) public override view returns (uint256) {

function getTargetUsdmAmount(address _token) public override view returns (uint256) {

function getEntryFundingRate(address _collateralToken, address _indexToken, bool _isLong) public view returns (uint256) {

function getPositionDelta(address _account, address _collateralToken, address _indexToken, bool _isLong) public view returns (bool, uint256) {

function getGlobalShortDelta(address _token) public view returns (bool, uint256) {

function getNextGlobalShortAveragePrice(address _indexToken, uint256 _nextPrice, uint256 _sizeDelta) public view returns (uint256) {

function getPositionLeverage(address _account, address _collateralToken, address _indexToken, bool _isLong) public view returns (uint256) {

function getNextAveragePrice(address _indexToken, uint256 _size, uint256 _averagePrice, bool _isLong, uint256 _nextPrice, uint256 _sizeDelta, uint256 _lastIncreasedTime) public view returns (uint256) {

function getUtilisation(address _token) public view returns (uint256) {

function getNextFundingRate(address _token) public override view returns (uint256) {
```























