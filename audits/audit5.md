### 3.181 CVF-181

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Documentation



**Recommendation:**

1. The function definition is unclear, suggest adding comments on it.

```
contracts/core/Vault.sol:9

function initialize(address _router, address _usdm, address _priceFeed, uint256 _liquidationFeeUsd, uint256 _fundingRateFactor, uint256 _stableFundingRateFactor) external {

function clearTokenConfig(address _token) external {
function withdrawFees(address _token, address _receiver) external override returns (uint256) {
function directPoolDeposit(address _token) external override nonReentrant {
function buyUSDM(address _token, address _receiver) external override nonReentrant returns (uint256) {
function sellUSDM(address _token, address _receiver) external override nonReentrant returns (uint256) {
function swap(address _tokenIn, address _tokenOut, address _receiver) external override nonReentrant returns (uint256) {


function increasePosition(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong) external override nonReentrant {
function decreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver) external override nonReentrant returns (uint256) {
function liquidatePosition(address _account, address _collateralToken, address _indexToken, bool _isLong, address _feeReceiver) external override nonReentrant {

function updateCumulativeFundingRate(address _collateralToken, address _indexToken) public {
```



### 3.182 CVF-182

- Severity: Minor
- Status: Opened
- Source: ShortsTrackerStorage.sol
- Category: Documention



**Recommendation:**

The mapping variable definition is unclear, suggest adding comments on it.



```
contracts/core/storage/ShortsTrackerStorage.sol:8

mapping (address => bool) public isHandler; 
mapping (bytes32 => bytes32) public data;
mapping (address => uint256) public override globalShortAveragePrices; 
```



### 3.183 CVF-183

- Severity: Minor
- Status: Opened
- Source: ShortsTracker.sol
- Category: Documentation



**Recommendation:**

The definition of the function is unclear, suggest adding comments on it.



```
contracts/core/ShortsTracker.sol:8

function updateGlobalShortData(address _account, address _collateralToken, address _indexToken, bool _isLong, uint256 _sizeDelta, uint256 _markPrice, bool _isIncrease) override external onlyHandler {

function getGlobalShortDelta(address _token) public view returns (bool, uint256) {
function getNextGlobalShortData(address _account, address _collateralToken, address _indexToken, uint256 _nextPrice, uint256 _sizeDelta, bool _isIncrease) override public view returns (uint256, uint256) {

function getRealisedPnl(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isIncrease) public view returns (int256) {

function _getNextGlobalAveragePrice(uint256 _averagePrice, uint256 _nextPrice, uint256 _nextSize, uint256 _delta, int256 _realisedPnl) public pure returns (uint256) {

function _getNextDelta(uint256 _delta, uint256 _averagePrice, uint256 _nextPrice, int256 _realisedPnl) internal pure returns (bool, uint256) {
```



### 3.184 CVF-184

- Severity: Minor
- Status: Opened
- Source: RouterStorage.sol
- Category: Documenation

**Recommendation:**

1. The mapping variable definition is unclear, suggest adding comments on it.



```
contracts/core/storage/RouterStorage.sol:18

    mapping (address => bool) public plugins;
    mapping (address => mapping (address => bool)) public approvedPlugins;
```





### 3.185 CVF-185

- Severity: Minor
- Status: Opened
- Source: RouterSettings.sol
- Category: Documentation



**Recommendation:**

1. The definition of the function or mapping variable is unclear, suggest adding comments on it.



```
contracts/core/settings/RouterSettings.sol:5

function _increasePosition(address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _price) internal {

function _decreasePosition(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price) internal returns (uint256) {

function _swap(address[] memory _path, uint256 _minOut, address _receiver) internal returns (uint256) {

function _vaultSwap(address _tokenIn, address _tokenOut, uint256 _minOut, address _receiver) internal returns (uint256) {

function _validatePlugin(address _account) internal view {
```



### 3.186 CVF-186

- Severity: Minor
- Status: Opened
- Source: Router.sol
- Category: Documentation



**Description:**

The comments of the function or mapping variable is unclear, suggest adding comments on it.



```
contracts/core/Router.sol:30

function pluginTransfer(address _token, address _account, address _receiver, uint256 _amount) external override {

function pluginIncreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong) external override {
function pluginDecreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver) external override returns (uint256) {

function directPoolDeposit(address _token, uint256 _amount) external {

function swap(address[] memory _path, uint256 _amountIn, uint256 _minOut, address _receiver) public override {

function swapETHToTokens(address[] memory _path, uint256 _minOut, address _receiver) external payable {

function swapTokensToETH(address[] memory _path, uint256 _amountIn, uint256 _minOut, address payable _receiver) external {

function increasePosition(address[] memory _path, address _indexToken, uint256 _amountIn, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external {

function increasePositionETH(address[] memory _path, address _indexToken, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external payable {

function decreasePosition(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price) external {

function decreasePositionETH(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address payable _receiver, uint256 _price) external {

function decreasePositionAndSwap(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price, uint256 _minOut) external {

function decreasePositionAndSwapETH(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address payable _receiver, uint256 _price, uint256 _minOut) external {
```





### 3.187 CVF-187

- Severity: Minor
- Status: Opened
- Source: PositionManagerStorage.sol
- Category: Documentation

**Recommendation:**

1. The definition of the function or mapping variable is unclear, suggest adding comments on it.



```
contracts/core/storage/PositionManagerStorage.sol:8

    mapping (address => bool) public isOrderKeeper; /* address => bool*/
    mapping (address => bool) public isPartner; /* address => bool*/
    mapping (address => bool) public isLiquidator; /* address => bool*/
```



### 3.188 CVF-188

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol
- Category: Documentation

**Description:**

The definition of the function or mapping variable is unclear, suggest adding comments on it.

```
contracts/core/PositionManager.sol:9

function increasePosition(address[] memory _path, address _indexToken, uint256 _amountIn, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external nonReentrant onlyPartnersOrOpened {

function increasePositionETH(address[] memory _path, address _indexToken, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external payable nonReentrant onlyPartnersOrOpened {

function decreasePosition(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price, uint256 _minOut, bool _withdrawETH) external nonReentrant onlyPartnersOrOpened {

function liquidatePosition(address _account, address _collateralToken, address _indexToken, bool _isLong, address _feeReceiver) external nonReentrant onlyLiquidator {

function executeSwapOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) external onlyOrderKeeper {

function executeIncreaseOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) external onlyOrderKeeper {

function executeDecreaseOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) external onlyOrderKeeper {

function _validateIncreaseOrder(address _account, uint256 _orderIndex) internal view {
```





### 3.189 CVF-189

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerStorage.sol
- Category: Documentation

**Description:**

The definition of the function or mapping variable is unclear, suggest adding comments on it



```
contracts/core/storage/BasePositionManagerStorage.sol:19

    mapping (address => uint256) public override maxGlobalLongSizes; /* token => uint*/
    mapping (address => uint256) public override maxGlobalShortSizes; /* token => uint*/
    mapping (address => uint256) public feeReserves; /* token=> uint*/
```



### 3.190 CVF-190

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerSettings.sol
- Category: Documentation

**Recommendation:**

1. The definition of the functions or the mapping variables are unclear, suggest adding comments on it.



```
contracts/core/settings/BasePositionManagerSettings.sol:31

function _validateMaxGlobalSize(address _indexToken, bool _isLong, uint256 _sizeDelta) internal view {
function _increasePosition(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _price) internal {

function _decreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price) internal returns (uint256) {

function _emitIncreasePositionReferral(address _account, uint256 _sizeDelta) internal {

function _emitDecreasePositionReferral(address _account, uint256 _sizeDelta) internal {

function _swap(address[] memory _path, uint256 _minOut, address _receiver) internal returns (uint256) {

function _vaultSwap(address _tokenIn, address _tokenOut, uint256 _minOut, address _receiver) internal returns (uint256) {

function _transferOutETHWithGasLimitIgnoreFail(uint256 _amountOut, address payable _receiver) internal {

function _collectFees(address _account, address[] memory _path, uint256 _amountIn, address _indexToken, bool _isLong, uint256 _sizeDelta) internal returns (uint256) {

function _shouldDeductFee(address _account, address[] memory _path, uint256 _amountIn, address _indexToken, bool _isLong, uint256 _sizeDelta) internal view returns (bool) {
```





### 3.191 CVF-191

- Severity: Minor
- Status: Opened
- Source: BasePositionManager.sol
- Category: Documentation

**Description:**

The definition of the mapping variable or the below functions are unclear, suggest adding comments on them.



```
contracts/core/BasePositionManager.sol:13

function withdrawFees(address _token, address _receiver) external onlyAdmin {

function approve(address _token, address _spender, uint256 _amount) external onlyGov {

function sendValue(address payable _receiver, uint256 _amount) external onlyGov {
```



### 3.192 CVF-192

- Severity: Minor
- Status: Opened
- Source: OrderBookStorage.sol
- Category: Documentation

**Description:**

The definition of the mapping variables or the below functions are unclear, suggest adding comments on them.



```
contracts/core/storage/OrderBookStorage.sol:13

    mapping (address => mapping(uint256 => DataTypes.IncreaseOrder)) public increaseOrders;
    mapping (address => uint256) public increaseOrdersIndex;
    mapping (address => mapping(uint256 => DataTypes.DecreaseOrder)) public decreaseOrders;
    mapping (address => uint256) public decreaseOrdersIndex;
    mapping (address => mapping(uint256 => DataTypes.SwapOrder)) public swapOrders;
    mapping (address => uint256) public swapOrdersIndex;
```





### 3.193 CVF-193

- Severity: Minor
- Status: Opened
- Source: OrderBookSettings.sol
- Category: Documentation



**Description:**

The definition of the mapping variables or the below functions are unclear, please adding comments on them.



```
contracts/core/settings/OrderBookSettings.sol:17

function getSwapOrder(address _account, uint256 _orderIndex) override public view returns (address path0, address path1, address path2, uint256 amountIn, uint256 minOut, uint256 triggerRatio, bool triggerAboveThreshold, bool shouldUnwrap, uint256 executionFee) {

function getUsdmMinPrice(address _otherToken) public view returns (uint256) {

function getDecreaseOrder(address _account, uint256 _orderIndex) override public view returns (address collateralToken, uint256 collateralDelta, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee) {

function getIncreaseOrder(address _account, uint256 _orderIndex) override public view returns (address purchaseToken, uint256 purchaseTokenAmount, address collateralToken, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee) {

function _transferInETH() internal {

function _transferOutETH(uint256 _amountOut, address payable _receiver) internal {

function _swap(address[] memory _path, uint256 _minOut, address _receiver) internal returns (uint256) {

function _vaultSwap(address _tokenIn, address _tokenOut, uint256 _minOut, address _receiver) internal returns (uint256) {

function _createSwapOrder(address _account, address[] memory _path, uint256 _amountIn, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold, bool _shouldUnwrap, uint256 _executionFee) internal {

function _createDecreaseOrder(address _account, address _collateralToken, uint256 _collateralDelta, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold) internal {

function _createIncreaseOrder(address _account, address _purchaseToken, uint256 _purchaseTokenAmount, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold, uint256 _executionFee) internal {
```



### 3.194 CVF-194

- Severity: Minor
- Status: Opened
- Source:
- Category: Documentation

**Description:**

The definition of the mapping variables or the below functions are unclear. Suggest adding comments on them.



```
contracts/core/OrderBook.sol:23

function createSwapOrder(address[] memory _path, uint256 _amountIn, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap, bool _shouldUnwrap) external payable nonReentrant {

function executeSwapOrder(address _account, uint256 _orderIndex, address payable _feeReceiver) override external nonReentrant {

function updateSwapOrder(uint256 _orderIndex, uint256 _minOut, uint256 _triggerRatio, bool _triggerAboveThreshold) external nonReentrant {

function cancelSwapOrder(uint256 _orderIndex) public nonReentrant {

function createIncreaseOrder(address[] memory _path, uint256 _amountIn, address _indexToken, uint256 _minOut, uint256 _sizeDelta, address _collateralToken, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold, uint256 _executionFee, bool _shouldWrap) external payable nonReentrant {

function executeIncreaseOrder(address _address, uint256 _orderIndex, address payable _feeReceiver) override external nonReentrant {

function updateIncreaseOrder(uint256 _orderIndex, uint256 _sizeDelta, uint256 _triggerPrice, bool _triggerAboveThreshold) external nonReentrant {

function cancelIncreaseOrder(uint256 _orderIndex) public nonReentrant {

function createDecreaseOrder(address _indexToken, uint256 _sizeDelta, address _collateralToken, uint256 _collateralDelta, bool _isLong, uint256 _triggerPrice, bool _triggerAboveThreshold) external payable nonReentrant {

function executeDecreaseOrder(address _address, uint256 _orderIndex, address payable _feeReceiver) override external nonReentrant {

function updateDecreaseOrder(uint256 _orderIndex, uint256 _collateralDelta, uint256 _sizeDelta, uint256 _triggerPrice, bool _triggerAboveThreshold) external nonReentrant {

function cancelDecreaseOrder(uint256 _orderIndex) public nonReentrant {

function validateSwapOrderPriceWithTriggerAboveThreshold(address[] memory _path, uint256 _triggerRatio) public view returns (bool) {

function validatePositionOrderPrice(bool _triggerAboveThreshold, uint256 _triggerPrice, address _indexToken, bool _maximizePrice, bool _raise) public view returns (uint256, bool) {

function cancelMultiple(uint256[] memory _swapOrderIndexes, uint256[] memory _increaseOrderIndexes, uint256[] memory _decreaseOrderIndexes) external {
```





### 3.195 CVF-195

- Severity: Minor
- Status: Opened
- Source: MlpManagerStorage.sol
- Category: Documentation



**Description:**

The definition of the mapping variables or the functions are unclear. Suggest adding comments on them.



```
contracts/core/storage/MlpManagerStorage.sol:21

mapping (address => bool) public isHandler; /* address => bool*/
mapping (address => uint256) public override lastAddedAt; /* account address => timestamp*/
```



### 3.196 CVF-196

- Severity: Minor
- Status: Opened
- Source: MlpManagerSettings.sol
- Category: Documentation



**Description:**

The definition of the below mapping variables or the functions are unclear. Suggest adding comments on them.



```
contracts/core/settings/MlpManagerSettings.sol:23

function _addLiquidity(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) internal returns (uint256) {

function _removeLiquidity(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) internal returns (uint256) {

function _validateHandler() internal view {

function getAumInUsdm(bool maximise) public override view returns (uint256) {

function getAum(bool maximise) public view returns (uint256) {

function getGlobalShortDelta(address _token, uint256 _price, uint256 _size) public view returns (uint256, bool) {

function getGlobalShortAveragePrice(address _token) public view returns (uint256) {


```



### 3.197 CVF-197

- Severity: Minor
- Status: Opened
- Source: MlpManager.sol
- Category: Documentation



**Description:**

The below definition of the mapping variables and the functions are unclear, suggest adding comments on them.



```
contracts/core/MlpManager.sol:13

function addLiquidity(address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {

function addLiquidityForAccount(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {

function removeLiquidity(address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {

function removeLiquidityForAccount(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {

function getPrice(bool _maximise) external view returns (uint256) {

function getAums() public view returns (uint256[] memory) {
```



### 3.198 CVF-198

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedStorage.sol
- Category: Suboptimal



**Desciption:**

Lack of range check for the mapping variable `priceFeeds`, it seems that there must be at least one token, suggest adding range check of the variable.



```
contracts/core/storage/VaultPriceFeedStorage.sol:28

mapping (address => address) public priceFeeds;
mapping (address => uint256) public priceDecimals;
mapping (address => uint256) public spreadBasisPoints;
mapping (address => bool) public strictStableTokens;
```





### 3.199 CVF-199

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Procedural



**Description:**

The function `_validate` should be moved to `libraries`



```
contracts/core/settings/VaultSettings.sol:125

function _validate(bool _condition, uint256 _errorCode) internal view {
```



### 3.200 CVF-200

- Severity: Minor
- Status: Opened
- Source
- Category: Suboptimal

**Description:**

Lack of range check, the variable `isLiquidator` should have range check. It seems that there must be at least one element for the variable.



```
contracts/core/storage/VaultStorage.sol:36

mapping (address => bool) public override isLiquidator;
mapping (address => bool) public override isManager;
mapping (address => bool) public override whitelistedTokens;
mapping (address => uint256) public override tokenDecimals;
```



### 3.201 CVF-201

- Severity: Minor
- Status: Opened
- Source: ShortsTrackerStorage.sol
- Category: Suboptimal

**Description:**

Lack of range check, the variable `isHandler` seems to have at least one element, suggest adding a range check.



```
contracts/core/storage/ShortsTrackerStorage.sol:8

mapping (address => bool) public isHandler; /* handler address => bool */
mapping (address => uint256) public override globalShortAveragePrices; /* tokenAddress => price*/
```



```
contracts/core/ShortsTracker.sol:20

function setHandler(address _handler, bool _isActive) external onlyGov {
function _setGlobalShortAveragePrice(address _token, uint256 _averagePrice) internal {
```





### 3.202 CVF-202

- Severity: Minor
- Status: Opened
- Source: RouterStorage.sol
- Category: Procedural



**Description:**

The import files should be moved to the `RouterAggregators.sol`



```
contracts/core/storage/RouterStorage.sol:3

import "../../libraries/math/SafeMath.sol";
import "../../libraries/token/IERC20.sol";
import "../../libraries/token/SafeERC20.sol";
import "../../libraries/utils/Address.sol";
import "../../libraries/Errors.sol";
import "../../libraries/Events.sol";
import "../../libraries/Errors.sol";
import "../../tokens/interfaces/IWETH.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IRouter.sol";
```



### 3.203 CVF-203

- Severity: Minor
- Status: Opened
- Source: Router.sol
- Category: Suboptimal



**Description:**

The variable `plugins` and `approvedPlugins` should have at least one element, suggest adding a range check. 



```
contracts/core/Router.sol:14

function addPlugin(address _plugin) external override onlyGov {
function removePlugin(address _plugin) external onlyGov {
```



```
contracts/core/Router.sol:20

function approvePlugin(address _plugin) external {
function denyPlugin(address _plugin) external {
```



### 3.204 CVF-204

- Severity: Minor
- Status: Opened
- Source: OrderBookStorage.sol
- Category: Suboptimal



**Description:**

The variable `increaseOrders`and `decreaseOrders` , should have a range check. 



```
contracts/core/storage/OrderBookStorage.sol:13

mapping (address => mapping(uint256 => DataTypes.IncreaseOrder)) public increaseOrders;
```



```
contracts/core/storage/OrderBookStorage.sol:15

mapping (address => mapping(uint256 => DataTypes.DecreaseOrder)) public decreaseOrders;
```



### 3.205 CVF-205

- Severity: Minor
- Status: Opened
- Source: MlpManagerStorage.sol
- Category: Suboptimal



**Description:**

The variable `isHandler` and `lastAddedAt` should add a range check.

```
contracts/core/storage/MlpManagerStorage.sol:21

mapping (address => bool) public isHandler; /* address => bool*/
mapping (address => uint256) public override lastAddedAt; /* account address => timestamp*/
```



```
contracts/core/settings/MlpManagerSettings.sol:12

    function setHandler(address _handler, bool _isActive) external onlyGov {
        isHandler[_handler] = _isActive;
    }
```



```
contracts/core/settings/MlpManagerSettings.sol:54

    function _validateHandler() internal view {
        require(isHandler[msg.sender], Errors.MLPMANAGER_FORBIDDEN);
    }
```





### 3.206 CVF-206

- Severity: Minor
- Status: Opened
- Source: PositionManagerStorage.sol
- Category: Suboptimal



**Description:**

The variable `isOrderKeeper` should have a range check



```
contracts/core/storage/PositionManagerStorage.sol:8

mapping (address => bool) public isOrderKeeper; /* address => bool*/
mapping (address => bool) public isPartner; /* address => bool*/
mapping (address => bool) public isLiquidator; /* address => bool*/
```



### 3.207 CVF-207

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerStorage.sol
- Category: Suboptimal



**Description:**

The variable `maxGlobalLongSizes` should have a range check



```
contracts/core/storage/BasePositionManagerStorage.sol:19

mapping (address => uint256) public override maxGlobalLongSizes; /* token => uint*/
mapping (address => uint256) public override maxGlobalShortSizes; /* token => uint*/
mapping (address => uint256) public feeReserves; /* token=> uint*/
```









