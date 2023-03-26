### 3.100 CVF-100

- Severity: Minor
- Status: Opened
- Source: MlpManagerSettings.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/MlpManagerSettings.sol:23

function _addLiquidity(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) internal returns (uint256) {
```



### 3.101 CVF-101

- Severity: Minor
- Status: Opened
- Source: MlpManagerSettings.sol
- Category: Bad datatypes

**Recommendations:**

1. `address _tokenOut` should be `IERC20`



```
contracts/core/settings/MlpManagerSettings.sol:37

function _removeLiquidity(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) internal returns (uint256) {
```





### 3.102 CVF-102

- Severity: Minor
- Status: Opened
- Source: MlpManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/MlpManagerSettings.sol:95

function getGlobalShortDelta(address _token, uint256 _price, uint256 _size) public view returns (uint256, bool) {
```



### 3.103 CVF-103

- Severity: Minor
- Status: Opened
- Source: MlpManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/MlpManagerSettings.sol:101

function getGlobalShortAveragePrice(address _token) public view returns (uint256) {
```





### 3.104 CVF-104

- Severity: Minor
- Status: Opened
- Source: MlpManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _vault` should be `IVault`
2. `address _usdm` should be `IERC20`
3. `address _mlp` should be `IMlpManager`
4. `address _shortsTracker` should be `IShortsTracker`



```
contracts/core/MlpManager.sol:5

constructor(address _vault, address _usdm, address _mlp, address _shortsTracker, uint256 _cooldownDuration) public {
```



### 3.105 CVF-105

- Severity: Minor
- Status: Opened
- Source: MlpManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/MlpManager.sol:13

function addLiquidity(address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {
```



```
contracts/core/MlpManager.sol:17

function addLiquidityForAccount(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external override nonReentrant returns (uint256) {
```





### 3.106 CVF-106

- Severity: Minor
- Status: Opened
- Source: MlpManager.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _tokenOut` should be `IERC20`



```
contracts/core/MlpManager.sol:21

function removeLiquidity(address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {
```





### 3.107 CVF-107

- Severity: Minor
- Status: Opened
- Source: MlpManager.sol
- Category: Bad datatypes



**Recommendation: **

1. `address _tokenOut` should be `IERC20`



```
contracts/core/MlpManager.sol:25

function removeLiquidityForAccount(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external override nonReentrant returns (uint256) {
```



### 3.108 CVF-108

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerAggregator.sol
- Category: Procedural

**Recommendation:**

We didn't review these files:

```
contracts/core/settings/BasePositionManagerAggregator.sol:3 - 13

import "../../libraries/Events.sol";
import "../../libraries/Errors.sol";
import "../../tokens/interfaces/IWETH.sol";
import "../interfaces/IRouter.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IShortsTracker.sol";
import "../interfaces/IOrderBook.sol";
import "../../peripherals/interfaces/ITimelock.sol";
import "../../referrals/interfaces/IReferralStorage.sol";
import "../../libraries/utils/ReentrancyGuard.sol";
import "../../access/Governable.sol";
```





### 3.109 CVF-109

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerStorage.sol
- Category: Procedural



**Recommendation:**

We didn't review these files

```
contracts/core/storage/BasePositionManagerStorage.sol:3 - 8

import "../../libraries/math/SafeMath.sol";
import "../../libraries/token/IERC20.sol";
import "../../libraries/token/SafeERC20.sol";
import "../../libraries/utils/Address.sol";
import "../../libraries/Errors.sol";
import "../interfaces/IBasePositionManager.sol";
```



### 3.110 CVF-110

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerStorage.sol
- Category: Bad datatypes



**Recommendation:**

1. `address public vault;` should be `IVault`
2. `address public shortsTracker;` should be `IShortsTracker`
3. `address public router;` should be `IRouter`
4. `address public weth;` should be `IERC20`



```
contracts/core/storage/BasePositionManagerStorage.sol:14 - 17

    address public vault;
    address public shortsTracker;
    address public router;
    address public weth;
```





### 3.111 CVF-111

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerStorage.sol
- Category: Bad datatypes



**Recommendation:**

1. `mapping (address => uint256) public override maxGlobalLongSizes` should be `IERC20`
2. `mapping (address => uint256) public override maxGlobalShortSizes;` should be `IERC20`
3. `mapping (address => uint256) public feeReserves` should be `IERC20`



```
contracts/core/storage/BasePositionManagerStorage.sol:19 - 21

    mapping (address => uint256) public override maxGlobalLongSizes; /* token => uint*/
    mapping (address => uint256) public override maxGlobalShortSizes; /* token => uint*/
    mapping (address => uint256) public feeReserves; /* token=> uint*/
```



### 3.112 CVF-112

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerStorage.sol
- Category: Hardcoded



**Recommendation:**

1. Should NOT use the hardcoded error message



```
contracts/core/storage/BasePositionManagerStorage.sol:27

require(msg.sender == admin, "BasePositionManager: forbidden");
```





### 3.113 CVF-113

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address[] memory _tokens` should be `IERC20`



```
contracts/core/settings/BasePositionManagerSettings.sol:22

function setMaxGlobalSizes(address[] memory _tokens, uint256[] memory _longSizes, uint256[] memory _shortSizes) external onlyAdmin {
```



### 3.114 CVF-114

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _indexToken` should be `IERC20`



```
contracts/core/settings/BasePositionManagerSettings.sol:31

function _validateMaxGlobalSize(address _indexToken, bool _isLong, uint256 _sizeDelta) internal view {
```



### 3.115 CVF-115

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/settings/BasePositionManagerSettings.sol:47

function _increasePosition(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _price) internal {
```





```
contracts/core/settings/BasePositionManagerSettings.sol:63

function _decreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price) internal returns (uint256) {
```





### 3.116 CVF-116

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address[] memory _path` should be `IERC20[]`



```
contracts/core/settings/BasePositionManagerSettings.sol:98

function _swap(address[] memory _path, uint256 _minOut, address _receiver) internal returns (uint256) {
```





### 3.117 CVF-117

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _tokenIn` should be `IERC20`
2. `address _tokenOut` should be `IERC20`



```
contracts/core/settings/BasePositionManagerSettings.sol:104

function _vaultSwap(address _tokenIn, address _tokenOut, uint256 _minOut, address _receiver) internal returns (uint256) {
```



### 3.118 CVF-118

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerSettings.sol
- Category: Bad datatypes



**Recommendation:**

1. `address[] memory _path` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/settings/BasePositionManagerSettings.sol:118

function _collectFees(address _account, address[] memory _path, uint256 _amountIn, address _indexToken, bool _isLong, uint256 _sizeDelta) internal returns (uint256) {
```



```
contracts/core/settings/BasePositionManagerSettings.sol:129

function _shouldDeductFee(address _account, address[] memory _path, uint256 _amountIn, address _indexToken, bool _isLong, uint256 _sizeDelta) internal view returns (bool) {
```





### 3.119 CVF-119

- Severity: Minor
- Status: Opened
- Source: BasePositionManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _vault` should be `IVault`
2. `address _router` should be `IRouter`
3. `address _shortsTracker` should be `IShortsTracker`
4. `address _weth` should be `IWETH`



```
contracts/core/BasePositionManager.sol:5

constructor(address _vault, address _router, address _shortsTracker, address _weth, uint256 _depositFee) public {
```



```
contracts/core/BasePositionManager.sol:6 - 10

        vault = _vault;
        router = _router;
        weth = _weth;
        depositFee = _depositFee;
        shortsTracker = _shortsTracker;
```





### 3.120 CVF-120

- Severity: Minor
- Status: Opened
- Source: BasePositionManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _token`  should be `IERC20`



```
contracts/core/BasePositionManager.sol:13

function withdrawFees(address _token, address _receiver) external onlyAdmin {
```



```
contracts/core/BasePositionManager.sol:20

function approve(address _token, address _spender, uint256 _amount) external onlyGov {
```



### 3.121 CVF-121

- Severity: Minor
- Status: Opened
- Source: PositionManagerAggregator.sol
- Category: Procedural



**Recommendation:**

1. We didn't review these files



```
contracts/core/settings/PositionManagerAggregator.sol:3

import "../interfaces/IRouter.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IOrderBook.sol";
import "../../peripherals/interfaces/ITimelock.sol";
import "../../libraries/Events.sol";
import "../../libraries/Errors.sol";
```



### 3.122 CVF-122

- Severity: Minor
- Status: Opened
- Source: PositionManagerStorage.sol
- Category: Bad datatypes



**Recommendation:**

1. `address public orderBook` should be `IOrderbook`



```
contracts/core/storage/PositionManagerStorage.sol:7

address public orderBook;
```



### 3.123 CVF-123

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _vault` should be `IVault`
2. `address _router` should be `IRouter`
3. `address _shortsTracker` should be `IShortsTracker`
4. `address _weth` should be `IWETH`



```
contracts/core/PositionManager.sol:6

constructor(address _vault, address _router, address _shortsTracker, address _weth, uint256 _depositFee, address _orderBook) public BasePositionManager(_vault, _router, _shortsTracker, _weth, _depositFee) {
```



### 3.124 CVF-124

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address[] memory _path` should be `IERC20[]`
2. `address _indexToken` should be `IERC20`



```
contracts/core/PositionManager.sol:9

function increasePosition(address[] memory _path, address _indexToken, uint256 _amountIn, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external nonReentrant onlyPartnersOrOpened {
```



### 3.125 CVF-125

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address[] memory _path` should be `IERC20[]`
2. `address _indexToken` should be `IERC20`



```
contracts/core/PositionManager.sol:23

function increasePositionETH(address[] memory _path, address _indexToken, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external payable nonReentrant onlyPartnersOrOpened {
```





### 3.126 CVF-126

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address[] memory _path` should be `IERC20[]`
2. `address _indexToken` should be `IERC20`



```
contracts/core/PositionManager.sol:38

function decreasePosition(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price, uint256 _minOut, bool _withdrawETH) external nonReentrant onlyPartnersOrOpened {
```



### 3.127 CVF-127

- Severity: Minor
- Status: Opened
- Source: PositionManager.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/PositionManager.sol:54

function liquidatePosition(address _account, address _collateralToken, address _indexToken, bool _isLong, address _feeReceiver) external nonReentrant onlyLiquidator {
```



### 3.128 CVF-128

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Unclear Behavior

**Recommendation**

1. This function should probably log an event.



```
contracts/core/settings/VaultPriceFeedSettings.sol:9

chainlinkFlags = _chainlinkFlags;
```





### 3.129 CVF-129

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Unclear behavior

**Recommendation:**

1. The function should probably log an event



```
contracts/core/settings/VaultPriceFeedSettings.sol:11

function setAdjustment(address _token, bool _isAdditive, uint256 _adjustmentBps) external override onlyGov {
```



### 3.130 CVF-130

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should probably log an event



```
contracts/core/settings/VaultPriceFeedSettings.sol:21

function setUseV2Pricing(bool _useV2Pricing) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:24

function setIsAmmEnabled(bool _isEnabled) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:27

function setIsSecondaryPriceEnabled(bool _isEnabled) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:30

function setSecondaryPriceFeed(address _secondaryPriceFeed) external onlyGov {
```



### 3.131 CVF-131

- Severity: Minor

- Status: Opened

- Source: VaultPriceFeedSettings.sol

- Category: Unclear behavior

  

**Recommendation:**

1. The function should probably log an event



```
contracts/core/settings/VaultPriceFeedSettings.sol:33

function setTokens(address _btc, address _eth, address _bnb) external onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:38

function setPairs(address _bnbBusd, address _ethBnb, address _btcBnb) external onlyGov {
```





### 3.132 CVF-132

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Unclear behavior

**Recommendation:**

1. The function should probably have a log event



```
contracts/core/settings/VaultPriceFeedSettings.sol:43

function setSpreadBasisPoints(address _token, uint256 _spreadBasisPoints) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:47

function setSpreadThresholdBasisPoints(uint256 _spreadThresholdBasisPoints) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:50

function setFavorPrimaryPrice(bool _favorPrimaryPrice) external override onlyGov {
```



### 3.133 CVF-133

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeedSettings.sol
- Category: Unclear behavior

**Recommendation:**

1. The function should have an event log



```
contracts/core/settings/VaultPriceFeedSettings.sol:53

function setPriceSampleSpace(uint256 _priceSampleSpace) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:57

function setMaxStrictPriceDeviation(uint256 _maxStrictPriceDeviation) external override onlyGov {
```



```
contracts/core/settings/VaultPriceFeedSettings.sol:60

function setTokenConfig(address _token, address _priceFeed, uint256 _priceDecimals, bool _isStrictStable) external override onlyGov {
```





### 3.134 CVF-134

- Severity: MInor
- Status: Opened
- Source: VaultErrorController.sol
- Category: Unclear behavior

**Recommendation:**

1. The function should have an event log

```
contracts/core/VaultErrorController.sol:7

function setErrors(IVault _vault, string[] calldata _errors) external onlyGov {
```





### 3.135 CVF-135

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should have an event log



```
contracts/core/settings/VaultSettings.sol:8

function setVaultUtils(IVaultUtils _vaultUtils) external override {
```



```
contracts/core/settings/VaultSettings.sol:12

function setErrorController(address _errorController) external {
```



```
contracts/core/settings/VaultSettings.sol:16

function setError(uint256 _errorCode, string calldata _error) external override {
```



### 3.136 CVF-136

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should have an event log



```
contracts/core/settings/VaultSettings.sol:20

function setInManagerMode(bool _inManagerMode) external override {
```



```
contracts/core/settings/VaultSettings.sol:24

function setManager(address _manager, bool _isManager) external override {
```



```
contracts/core/settings/VaultSettings.sol:28

function setInPrivateLiquidationMode(bool _inPrivateLiquidationMode) external override {
```



### 3.137 CVF-137

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should have an event log



```
contracts/core/settings/VaultSettings.sol:32

function setLiquidator(address _liquidator, bool _isActive) external override {
```



```
contracts/core/settings/VaultSettings.sol:36

function setIsSwapEnabled(bool _isSwapEnabled) external override {
```



```
contracts/core/settings/VaultSettings.sol:40

function setIsLeverageEnabled(bool _isLeverageEnabled) external override {
```



```
contracts/core/settings/VaultSettings.sol:44

function setMaxGasPrice(uint256 _maxGasPrice) external override {
```



```
contracts/core/settings/VaultSettings.sol:48

function setGov(address _gov) external {
```



### 3.138 CVF-138

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should have an event log



```
contracts/core/settings/VaultSettings.sol:52

function setPriceFeed(address _priceFeed) external override {
```



```
contracts/core/settings/VaultSettings.sol:56

function setMaxLeverage(uint256 _maxLeverage) external override {
```



```
contracts/core/settings/VaultSettings.sol:61

function setBufferAmount(address _token, uint256 _amount) external override {
```



```
contracts/core/settings/VaultSettings.sol:65

function setMaxGlobalShortSize(address _token, uint256 _amount) external override {
```



### 3.139 CVF-139

- Severity: Minor
- Status: Opened
- Source: VaultSettings.sol
- Category: Unclear behavior



**Recommendation:**

1. The function should have an event log



```
contracts/core/settings/VaultSettings.sol:69

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
```



```
contracts/core/settings/VaultSettings.sol:88

function setFundingRate(uint256 _fundingInterval, uint256 _fundingRateFactor, uint256 _stableFundingRateFactor) external override {
```



```
contracts/core/settings/VaultSettings.sol:97

function setTokenConfig(address _token, uint256 _tokenDecimals, uint256 _tokenWeight, uint256 _minProfitBps, uint256 _maxUsdmAmount, bool _isStable, bool _isShortable) external override {
```



```
contracts/core/settings/VaultSettings.sol:116

function setUsdmAmount(address _token, uint256 _amount) external override {
```



### 3.140 CVF-140

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Unclear behavior



**Recommendation:**

The function should have an event log



```
contracts/core/Vault.sol:189

function decreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver) external override nonReentrant returns (uint256) {
```



### 3.141 CVF-141

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Unclear behavior

**Recommendation:**

The function should have an event log



```
contracts/core/Vault.sol:9

function initialize(address _router, address _usdm, address _priceFeed, uint256 _liquidationFeeUsd, uint256 _fundingRateFactor, uint256 _stableFundingRateFactor) external {
```





### 3.142 CVF-142

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Unclear behavior

**Recommendation:**

The function should have an event log

```
contracts/core/Vault.sol:20

function clearTokenConfig(address _token) external {
```





### 3.143 CVF-143

- Severity: MInor
- Status: Opened
- Source: Vault.sol
- Category: Unclear behavior

**Recommendation: **

```
contracts/core/Vault.sol:33

function withdrawFees(address _token, address _receiver) external override returns (uint256) {
```





### 3.144 CVF-144

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Unclear behavior

**Recommendation:**

```
contracts/core/Vault.sol:41

function addRouter(address _router) external {
```



```
contracts/core/Vault.sol:44

function removeRouter(address _router) external {
```



```
contracts/core/Vault.sol:47

function upgradeVault(address _newVault, address _token, uint256 _amount) external {
```

























