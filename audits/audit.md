# 1. Document Properties

### 1.1 version


### 1.2 contact

# 2. Introduction

The following document provides the result of the audit preformed by [TBD] Consulting at the cumstomer request. The audit goal is a general view of the smart contracts structure, critical/major bugs detection and issuing the general recommendations. We have reviewed the contracts in the Mold repository https://github.com/Ceres-Coin/mold_contracts, commit [TBD]



- Router.sol
- Vault.sol
- PositionManager.sol
- BasePositionManager.sol



## 2.1. About Us

[TBD] Consulting, established in 2017, is a leading service provider in the space of blockchain development and audit. It has contributed to several blockchain projects, and co-authored some widely known blockchain projects. The [TBD] Audit Team, led by [TBD] and [TBD], has conducted over 30 audits of blockchain projects in Solidity, Rust, Javascript and other languages.



## 2.2 Disclaimer

Note that the audit represents current best practices and smart contract standards which are relevant at the date of publication. After fixing the indicated issues the smart contracts should be re-audited.



## 2.3 Methodology





The methodology is not a strict formal procedure, but rather a collection of methods and tactics that combined differently and tuned for every particular project, depending on the project structure and used technologies, as well as on what the client is expecting from the audit. In current audit, we use:

- General Code Assessment

The code is reviewed for clarity, consistency, style, and for whether it follows code best practices applicable to the particular programming language used. We check naming convention, commented code blocks, code duplication, confusing names, confusing, irrelevant, or missing comments etc. At this phase we also understand overall code structure.



- Entity Usage Analysis

Usages of various entities defined in the code are analyzed. This includes both: 

1. internal usages from other parts of the code

2. external usages. 

We check that entities are defined in proper places and that their visibility scopes and access levels are relevant. At this phase, we understand overall system architecture and how different parts of the code are related to each other.



- Access Control Analysis

For those entities, that could be accessed externally, access control measures are analyzed. We check that access control is relevant and is done properly. At this phase, we understand user roles and permissions. We also understand what assets, the system ought to protect.



- Code Logic Analysis

The code logic of particular functions is analyzed for correctness and efficiency. We check that code actually does what it is supposed to do and the algorithms are optimal and correct. And the proper data types are used. We also check that external libraries used in the code are up to date. At this phase we also understand data structures used and the purposes they are used for. 





# 3. CVF



### 3.1 CVF-1

- Severity: Minor
- Category: Suboptimal
- Status: opened
- Source: Router.sol

**Recommendation**: Should be "ˆ0.6.0" according to a common best practice.

```
contracts/core/Router.sol:1

pragma solidity 0.6.12;
```





### 3.2 CVF-2

- Severity: Minor
- Category: Procedural
- Status: Opened
- Source: RouterStorage.sol

**Description** We didn’t review these files

```
contracts/core/storage/RouterStorage.sol:3 - 12

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



### 3.3 CVF-3

- Severity: Minor
- Category: Procedural
- Status: Opened
- Source: Router.sol

**Recommendation** SPDX license identifier should be in the first line of the file.

```
contracts/core/Router.sol:2

// SPDX-License-Identifier: MIT
```



### 3.4 CVF-4

- Severity: Minor
- Category: Bad datatype
- Status: Opened
- Source: RouterStorage.sol

**Recommendation**: The type of this storage variable should be "IWETH".

```
contracts/core/storage/RouterStorage.sol:15

address public weth;
```



### 3.5 CVF-5

- Severity: Minor
- Category: Bad datatype
- Status: Opened
- Source: RouterStorage.sol



**Recommendation**: The type of this storage variable should be **IUSDM**

```
contracts/core/storage/RouterStorage.sol:16

address public usdm;
```





### 3.6 CVF-6

- Severity: Minor
- Category: Bad datatype
- Status: Opened
- Source: RouterStorage.sol

**Recommendation**: The type of this storage variable should be **IVAULT**

```
contracts/core/storage/RouterStorage.sol:17

address public vault;
```



### 3.7 CVF-7

- Severity: Minor
- Category: Duplicate
- Status: Opened
- Source: RouterStorage.sol

**Recommendation**: The duplicate of import files.

```
contracts/core/storage/RouterStorage.sol:9

import "../../libraries/Errors.sol";
```





### 3.8 CVF-8

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: RouterSettings.sol

**Description**: The type of `address[] memory _path` should be `IERC20[] memory _path` 

```
contracts/core/settings/RouterSettings.sol:29

function _swap(address[] memory _path, uint256 _minOut, address _receiver) internal returns (uint256) {
```



### 3.9 CVF-9

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: RouterSettings.sol

**Recommendation:** The type `address _collateralToken` should be `IERC20 _collateralToken ` 

```
contracts/core/settings/RouterSettings.sol:5

function _increasePosition(address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong, uint256 _price) internal {
```





### 3.10 CVF-10

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: RouterSettings.sol

**Recommendation:** 

1. The type `address _collateralToken` should be `IERC20 _collateralToken`.
2. The type `address _indexToken` should be `IERC20 _indexToken`

```
contracts/core/settings/RouterSettings.sol:13

function _decreasePosition(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price) internal returns (uint256) {
```







### 3.11 CVF-11

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: Router.sol

**Recommendation:**

The variable `address _token` should be `IERC20 _token`.

```
contracts/core/Router.sol:26

function pluginTransfer(address _token, address _account, address _receiver, uint256 _amount) external override {
```





### 3.12 CVF-12

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: Router.sol

**Recommendation:**

1. The variable `address _collateralToken` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`
3. The variable `address _token` should be `IERC20`

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





### 3.13 CVF-13

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: Router.sol

**Recommendation:**

The variable `address[] memory _path` should be `IERC20[] memory _path`

```
contracts/core/Router.sol:42
contracts/core/Router.sol:47
contracts/core/Router.sol:53

function swap(address[] memory _path, uint256 _amountIn, uint256 _minOut, address _receiver) public override {
function swapETHToTokens(address[] memory _path, uint256 _minOut, address _receiver) external payable {
function swapTokensToETH(address[] memory _path, uint256 _amountIn, uint256 _minOut, address payable _receiver) external {
```



### 3.14 CVF-14

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: Router.sol

**Recommendation:**

1. The variable `address[] memory _path` should be `IERC20[] memory _path`
2. The variable `address _indexToken` should be `IERC20 _indexToken`

```
contracts/core/Router.sol:60

function increasePosition(address[] memory _path, address _indexToken, uint256 _amountIn, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external {
```



```
contracts/core/Router.sol:70

function increasePositionETH(address[] memory _path, address _indexToken, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external payable {
```



### 3.15 CVF-15

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: Router.sol

**Recommendation: **

1. The variable `address _collateralToken` should be `IERC20 _collateralToken`
2. The variable `address _indexToken` should be `IERC20 _indexToken`

```
contracts/core/Router.sol:81

function decreasePosition(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price) external {
```



```
contracts/core/Router.sol:84
function decreasePositionETH(address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address payable _receiver, uint256 _price) external {
```





### 3.16 CVF-16

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: Router.sol



**Recommendation:** 

1. The variable `address[] memory _path` should be `IERC20[] memory _path`
2. The variable `address _indexToken` should be `IERC20 _indexToken`

```
contracts/core/Router.sol:88

function decreasePositionAndSwap(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price, uint256 _minOut) external {
```



```
contracts/core/Router.sol:93

function decreasePositionAndSwapETH(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address payable _receiver, uint256 _price, uint256 _minOut) external {
```





### 3.17 CVF-17

- Severity: Mederate
- Category: Unused code
- Status: Opened
- Source: Vault.sol



**Description:**

Should remove the comments code

```
contracts/core/Vault.sol:4

import "hardhat/console.sol";
```



```
contracts/core/Vault.sol:180 - 187

//        console.logBytes32(key);
//        console.log(position.size);
//        console.log(position.collateral);
//        console.log(position.averagePrice);
//        console.log(position.entryFundingRate);
//        console.log(position.reserveAmount);
//        console.logInt(position.realisedPnl);
//        console.log(position.lastIncreasedTime);
```



### 3.18 CVF-18

- Severity: Minor
- Category: Bad Datatypes
- Status: Opened
- Source: VaultStorage.sol

**Recommendation:**

The variable `address public errorController` should be `IVaultErrorController`

```
contracts/core/storage/VaultStorage.sol:29

address public errorController;
```





### 3.19 CVF-19

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultStorage.sol

**Recommendation:**

The variable `address public override router;` should be `IRouter`

```
contracts/core/storage/VaultStorage.sol:30

address public override router;
```





### 3.20 CVF-20

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultStorage.sol

**Recommendation:**

The variable `address public override priceFeed;` should be `IVaultPriceFeed`

```
contracts/core/storage/VaultStorage.sol:31

address public override priceFeed;
```







### 3.21 CVF-21

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultStorage.sol

**Recommendation:**

The variable `address public override usdm;` should be `IUSDM`

```
contracts/core/storage/VaultStorage.sol:32

address public override usdm;
```



### 3.22 CVF-22

- Severity: Minor
- Category: Procedural
- Status: Opened
- Source: VaultAggregators.sol

**Description:**

We didn't review these files:

```
contracts/core/storage/VaultAggregators.sol:3 - 14

import "../../libraries/math/SafeMath.sol";
import "../../libraries/token/IERC20.sol";
import "../../libraries/token/SafeERC20.sol";
import "../../libraries/DataTypes.sol";
import "../../libraries/Constants.sol";
import "../../libraries/Events.sol";
import "../../libraries/Errors.sol";
import "../../libraries/utils/ReentrancyGuard.sol";
import "../interfaces/IVaultUtils.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IVaultPriceFeed.sol";
import "../../tokens/interfaces/IUSDM.sol";
```



### 3.23 CVF-23

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultStorage.sol

**Recommendation:**

The variable `address[] public override allWhitelistedTokens;` should be `IERC20`

```
contracts/core/storage/VaultStorage.sol:34

address[] public override allWhitelistedTokens;
```





### 3.24 CVF-24

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultStorage.sol

**Recommendation:**

1. The variable `mapping (address => bool) public override whitelistedTokens;` should be `IERC20`
2. The variable `mapping (address => uint256) public override tokenDecimals;` should be `IERC20`
3. The variable `mapping (address => bool) public override stableTokens;` should be `IERC20`
4. The variable `mapping (address => bool) public override shortableTokens;` should be `IERC20`

```
contracts/core/storage/VaultStorage.sol:38

mapping (address => bool) public override whitelistedTokens;
```

```
contracts/core/storage/VaultStorage.sol:39

mapping (address => uint256) public override tokenDecimals;
```

```
contracts/core/storage/VaultStorage.sol:41

mapping (address => bool) public override stableTokens;
```

```
contracts/core/storage/VaultStorage.sol:42

mapping (address => bool) public override shortableTokens;
```



### 3.25 CVF-25

- Severity: Minor
- Category: Bad Datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _errorController` should be `IVaultErrorController`

```
contracts/core/settings/VaultSettings.sol:12

function setErrorController(address _errorController) external {
```



### 3.26 CVF-26

- Severity: Mederate
- Category: Code Defects
- Status: Opened
- Source: VaultSettings.sol

**Description:**

The function `_onlyGov` should be `modifier`

```
contracts/core/settings/VaultSettings.sol:5

    function _onlyGov() internal view {
        _validate(msg.sender == gov, 53);
    }
```





### 3.27 CVF-27

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _priceFeed` should be `IVaultPriceFeed`

```
contracts/core/settings/VaultSettings.sol:52

function setPriceFeed(address _priceFeed) external override {
```



### 3.28 CVF-28

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:61

function setBufferAmount(address _token, uint256 _amount) external override {
```



### 3.29 CVF-29

- Severity: Minor

- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:65

function setMaxGlobalShortSize(address _token, uint256 _amount) external override {
```



### 3.30 CVF-30

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:97

function setTokenConfig(address _token, uint256 _tokenDecimals, uint256 _tokenWeight, uint256 _minProfitBps, uint256 _maxUsdmAmount, bool _isStable, bool _isShortable) external override {
```



### 3.31 CVF-31

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:116

function setUsdmAmount(address _token, uint256 _amount) external override {
```



### 3.32 CVF-32

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:128

function _increaseUsdmAmount(address _token, uint256 _amount) internal {
```



```
contracts/core/settings/VaultSettings.sol:136

function _decreaseUsdmAmount(address _token, uint256 _amount) internal {
```





### 3-33 CVF-33

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`.

```
contracts/core/settings/VaultSettings.sol:147

function usdToTokenMin(address _token, uint256 _usdAmount) public view returns (uint256) {
```



### 3.34 CVF-34

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`.

```
contracts/core/settings/VaultSettings.sol:151

function usdToTokenMax(address _token, uint256 _usdAmount) public view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:155

function tokenToUsdMin(address _token, uint256 _tokenAmount) public override view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:161

function usdToToken(address _token, uint256 _usdAmount, uint256 _price) public view returns (uint256) {
```



### 3.35 CVF-35

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

1. The variable `address _collateralToken` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:174

function validateLiquidation(address _account, address _collateralToken, address _indexToken, bool _isLong, bool _raise) override public view returns (uint256, uint256) {
```



### 3.36 CVF-36

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`.

```
contracts/core/settings/VaultSettings.sol:177

function getMaxPrice(address _token) public override view returns (uint256) {
```





### 3.37 CVF-37

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

1. The variable `address _collateralToken` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:180

function getPositionFee(address _account, address _collateralToken, address _indexToken, bool _isLong, uint256 _sizeDelta) public view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:183

function getFundingFee(address _account, address _collateralToken, address _indexToken, bool _isLong, uint256 _size, uint256 _entryFundingRate) public view returns (uint256) {
```





### 3.38 CVF-38

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

1. The variable `address _token` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:186

function getMinPrice(address _token) public override view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:189

function getDelta(address _indexToken, uint256 _size, uint256 _averagePrice, bool _isLong, uint256 _lastIncreasedTime) public override view returns (bool, uint256) {
```



### 3.39 CVF-39

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

1. The variable `address _collateralToken` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`



```
contracts/core/settings/VaultSettings.sol:206

function getPositionKey(address _account, address _collateralToken, address _indexToken, bool _isLong) public pure returns (bytes32) {
```



```
contracts/core/settings/VaultSettings.sol:209

function getPosition(address _account, address _collateralToken, address _indexToken, bool _isLong) public override view returns (uint256, uint256, uint256, uint256, uint256, uint256, bool, uint256) {
```



### 3.40. CVF-40

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol



**Recommendation:**

1. The variable `address _token` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:215

function getRedemptionCollateral(address _token) public view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:222

function getRedemptionCollateralUsd(address _token) public view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:225

function getRedemptionAmount(address _token, uint256 _usdmAmount) public override view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:230

function getFeeBasisPoints(address _token, uint256 _usdmDelta, uint256 _feeBasisPoints, uint256 _taxBasisPoints, bool _increment) public override view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:233

function getTargetUsdmAmount(address _token) public override view returns (uint256) {
```



### 3.41 CVF-41

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation**

1. The variable `address _collateralToken` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:239

function getEntryFundingRate(address _collateralToken, address _indexToken, bool _isLong) public view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:242

function getPositionDelta(address _account, address _collateralToken, address _indexToken, bool _isLong) public view returns (bool, uint256) {
```



### 3.42 CVF-42

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

1. The variable `address _token` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:247

function getGlobalShortDelta(address _token) public view returns (bool, uint256) {
```



```
contracts/core/settings/VaultSettings.sol:257

function getNextGlobalShortAveragePrice(address _indexToken, uint256 _nextPrice, uint256 _sizeDelta) public view returns (uint256) {
```



### 3.43 CVF-43

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

1. The variable `address _collateralToken` should be `IERC20`
2. The variable `address _indexToken` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:267

function getPositionLeverage(address _account, address _collateralToken, address _indexToken, bool _isLong) public view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:273

function getNextAveragePrice(address _indexToken, uint256 _size, uint256 _averagePrice, bool _isLong, uint256 _nextPrice, uint256 _sizeDelta, uint256 _lastIncreasedTime) public view returns (uint256) {
```



### 3.44 CVF-44

- Severity: Minor
- Category: Bad datatypes
- Status: Opened
- Source: VaultSettings.sol

**Recommendation:**

The variable `address _token` should be `IERC20`

```
contracts/core/settings/VaultSettings.sol:284

function getUtilisation(address _token) public view returns (uint256) {
```



```
contracts/core/settings/VaultSettings.sol:289

function getNextFundingRate(address _token) public override view returns (uint256) {
```





### 3.45 CVF-45

- Severity: Minor
- Status: Opened
- Source: VaultInternal.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/settings/VaultInternal.sol:5

function _reduceCollateral(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong) internal returns (uint256, uint256) {
```





### 3.46 CVF-46



- Severity: Minor
- Status: Opened
- Source: VaultInternal.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/VaultInternal.sol:54

function _collectSwapFees(address _token, uint256 _amount, uint256 _feeBasisPoints) internal returns (uint256) {
```





### 3.47 CVF-47

- Severity: Minor
- Status: Opened
- Source: VaultInternal.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/settings/VaultInternal.sol:61

function _collectMarginFees(address _account, address _collateralToken, address _indexToken, bool _isLong, uint256 _sizeDelta, uint256 _size, uint256 _entryFundingRate) internal returns (uint256) {
```





### 3.48 CVF-48

- Severity: Minor
- Status: Opened
- Source: VaultInternal.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/VaultInternal.sol:70

function _transferIn(address _token) internal returns (uint256) {
```



```
contracts/core/settings/VaultInternal.sol:76

function _transferOut(address _token, uint256 _amount, address _receiver) internal {
```



```
contracts/core/settings/VaultInternal.sol:80

function _updateTokenBalance(address _token) internal {
```



```
contracts/core/settings/VaultInternal.sol:84

function _increasePoolAmount(address _token, uint256 _amount) internal {
```



```
contracts/core/settings/VaultInternal.sol:90

function _decreasePoolAmount(address _token, uint256 _amount) internal {
```





### 3.49 CVF-49

- Severity: Minor
- Status: Opened
- Source: VaultInternal.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/VaultInternal.sol:95

function _increaseReservedAmount(address _token, uint256 _amount) internal {
```



```
contracts/core/settings/VaultInternal.sol:100

function _decreaseReservedAmount(address _token, uint256 _amount) internal {
```



```
contracts/core/settings/VaultInternal.sol:104

function _increaseGuaranteedUsd(address _token, uint256 _usdAmount) internal {
```



```
contracts/core/settings/VaultInternal.sol:108

function _decreaseGuaranteedUsd(address _token, uint256 _usdAmount) internal {
```



```
contracts/core/settings/VaultInternal.sol:112

function _increaseGlobalShortSize(address _token, uint256 _amount) internal {
```



```
contracts/core/settings/VaultInternal.sol:119

function _decreaseGlobalShortSize(address _token, uint256 _amount) internal {
```



### 3.50 CVF-50

- Severity: Minor
- Status: Opened
- Source: VaultInternal.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/settings/VaultInternal.sol:148

function _validateTokens(address _collateralToken, address _indexToken, bool _isLong) internal view {
```





### 3-51 CVF-51

- Severity: Minor
- Status: Opened
- Source: VaultInternal.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/settings/VaultInternal.sol:160

function _validateBufferAmount(address _token) internal view {
```





### 3.52 CVF-52

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _router` should be `IRouter`
2. `address _usdm` should be `IUSDM`
3. `address _priceFeed` should be `IVaultPriceFeed`



```
contracts/core/Vault.sol:9

function initialize(address _router, address _usdm, address _priceFeed, uint256 _liquidationFeeUsd, uint256 _fundingRateFactor, uint256 _stableFundingRateFactor) external {
```





### 3.53 CVF-53

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/Vault.sol:20

function clearTokenConfig(address _token) external {
```



### 3.54 CVF-54

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`

```
contracts/core/Vault.sol:33

function withdrawFees(address _token, address _receiver) external override returns (uint256) {
```



### 3.55 CVF-55

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _router` should be `IRouter`

```
contracts/core/Vault.sol:41

function addRouter(address _router) external {
```



```
contracts/core/Vault.sol:44

function removeRouter(address _router) external {
```





### 3.56 CVF-56

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _newVault` should be `IVault`
2. `address _token` should be `IERC20`

```
contracts/core/Vault.sol:47

function upgradeVault(address _newVault, address _token, uint256 _amount) external {
```





### 3.57 CVF-57

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`

```
contracts/core/Vault.sol:51

function directPoolDeposit(address _token) external override nonReentrant {
```



```
contracts/core/Vault.sol:58

function buyUSDM(address _token, address _receiver) external override nonReentrant returns (uint256) {
```



```
contracts/core/Vault.sol:80

function sellUSDM(address _token, address _receiver) external override nonReentrant returns (uint256) {
```





### 3.58 CVF-58

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _tokenIn` should be `IERC20`
2. `address _tokenOut` should be `IERC20`



```
contracts/core/Vault.sol:102

function swap(address _tokenIn, address _tokenOut, address _receiver) external override nonReentrant returns (uint256) {
```





### 3.59 CVF-59

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/Vault.sol:131

function increasePosition(address _account, address _collateralToken, address _indexToken, uint256 _sizeDelta, bool _isLong) external override nonReentrant {
```



```
contracts/core/Vault.sol:189

function decreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver) external override nonReentrant returns (uint256) {
```



```
contracts/core/Vault.sol:194

function liquidatePosition(address _account, address _collateralToken, address _indexToken, bool _isLong, address _feeReceiver) external override nonReentrant {
```



```
contracts/core/Vault.sol:233

function updateCumulativeFundingRate(address _collateralToken, address _indexToken) public {
```



```
contracts/core/Vault.sol:250

function _decreasePosition(address _account, address _collateralToken, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver) internal returns (uint256) {
```





### 3.60 CVF-60

- Severity: Minor
- Status: Opened
- Source: VaultPriceFeed.sol
- Category: Bad datatypes

**Recommendation**

1. `address _token` should be `IERC20`



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



### 3.61 CVF-61

- Severity: Minor
- Status: Opened
- Source: VaultUtils.sol
- Category: Bad datatypes



**Recommendation:**

1. `address _collateralToken` should be `IERC20`
2. `address _indexToken` should be `IERC20`



```
contracts/core/VaultUtils.sol:15

function validateLiquidation(address _account, address _collateralToken, address _indexToken, bool _isLong, bool _raise) public view override returns (uint256, uint256) {
```



```
contracts/core/VaultUtils.sol:43

function getEntryFundingRate(address _collateralToken,address, bool) public override view returns (uint256) {
```





### 3.62 CVF-62

- Severity: Minor
- Status: Opened
- Source: VaultUtils.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _collateralToken`  should be `IERC20`

```
contracts/core/VaultUtils.sol:51

function getFundingFee(address, address _collateralToken, address,bool,uint256 _size, uint256 _entryFundingRate) public override view returns (uint256) {
```



### 3.63 CVF-63

- Severity: Minor
- Status: Opened
- Source: VaultUtils.sol
- Category: Bad datatypes

**Recommendation:**

1. `address _token` should be `IERC20`



```
contracts/core/VaultUtils.sol:57

function getBuyUsdmFeeBasisPoints(address _token, uint256 _usdmAmount) public override view returns (uint256) {
```



```
contracts/core/VaultUtils.sol:60

function getSellUsdmFeeBasisPoints(address _token, uint256 _usdmAmount) public override view returns (uint256) {
```





### 3.64 CVF-64

- Severity: Minor
- Status: Opened
- Source: Vault
- Category: Bad datatypes

**Recommendation:**

1. `address _tokenIn` should be `IERC20`
2. `address _tokenOut` should be `IERC20`



```
contracts/core/VaultUtils.sol:63

function getSwapFeeBasisPoints(address _tokenIn, address _tokenOut, uint256 _usdmAmount) public override view returns (uint256) {
```





































