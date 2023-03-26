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



### 3.208 CVF-208

- Severity: Minor
- Status: Opened
- Source: BasePositionManagerStorage.sol
- Category: Suboptimal



**Description:**

The mapping variable `mapping(address => uint256) public feeReserves` should have a range check. It seems that the `feeReserves` should have at least one element. Suggest adding a range checker.



```
contracts/core/storage/BasePositionManagerStorage.sol:24

mapping(address => uint256) public feeReserves; /* token=> uint*/
```



### 3.209 CVF-209

- Severity: Moderate
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal

**Description:**

Deleting the order of the variable `swapOrders`, may make the function vulnerable to reentrancy attacks.



```
contracts/core/OrderBook.sol:47

delete swapOrders[_account][_orderIndex];
```



### 3.210 CVF-210

- Severity: Moderate
- Status: Opened
- Source: OrderBook.sol
- Category: Suboptimal



**Description:**

Deleting the variable `swapOrders`, may make the function vulnerable to reentrancy attacks.



```
contracts/core/OrderBook.sol:70

delete swapOrders[msg.sender][_orderIndex];
```



### 3.211 CVF-211

- Severity: Moderate
- Status: Opened
- Source: Orderbook.sol
- Category: Suboptimal



**Description:**

Deleting the variable `increaseOrders`, may make the function vulnerable to reentrancy attacks.



```
contracts/core/OrderBook.sol:109

delete increaseOrders[_address][_orderIndex];
```



```
contracts/core/OrderBook.sol:133

delete increaseOrders[msg.sender][_orderIndex];
```



### 3.212 CVF-212

- Severity: Moderate
- Status: Opened
- Source: Orderbook.sol
- Category: Suboptimal



**Description:**

Deleting the variable `decreaseOrders`, may make the function vulnerable to reentrancy attacks



```
contracts/core/OrderBook.sol:152

delete decreaseOrders[_address][_orderIndex];
```



```
contracts/core/OrderBook.sol:174

delete decreaseOrders[msg.sender][_orderIndex];
```



### 3.213 CVF-213

- Severity: Minor
- Status: Opened
- Source: RewardRouterV2.sol
- Category: Suboptimal

**Description:**

We didn't review these files

```
contracts/staking/RewardRouterV2.sol
contracts/staking/interfaces/IRewardTracker.sol
contracts/staking/interfaces/IVester.sol
```



### 3.214 CVF-214

- Severity: Minor
- Status: Opened
- Source: YieldToken.sol
- Category: Suboptimal

**Description:**

We didn't review these files:

```
contracts/tokens/YieldToken.sol
contracts/tokens/USDM.sol
contracts/tokens/MintableBaseToken.sol
contracts/tokens/BaseToken.sol
contracts/tokens/interfaces/IBaseToken.sol
contracts/tokens/interfaces/IMintable.sol
contracts/tokens/interfaces/IUSDM.sol
contracts/tokens/interfaces/IWETH.sol
contracts/tokens/interfaces/IYieldToken.sol
contracts/tokens/interfaces/IYieldTracker.sol
```



### 3.215 CVF-215

- Severity: Minor
- Status: Opened
- Source: peripherals
- Category: Suboptimal



**Description:**

We didn't review these files:

```
contracts/peripherals
contracts/peripherals/interfaces
contracts/peripherals/interfaces/IHandlerTarget.sol
contracts/peripherals/interfaces/ITimelock.sol
contracts/peripherals/interfaces/ITimelockTarget.sol
contracts/peripherals/Reader.sol
contracts/peripherals/Timelock.sol
contracts/peripherals/VaultReader.sol
```





### 3.216 CVF-216

- Severity: Minor
- Status: Opened
- Source: oracle
- Category: Suboptimal



**Description:**

We didn't review these files:

```
contracts/oracle
contracts/oracle/interfaces
contracts/oracle/interfaces/IChainlinkFlags.sol
contracts/oracle/interfaces/IPriceFeed.sol
contracts/oracle/interfaces/ISecondaryPriceFeed.sol
contracts/oracle/PriceFeed.sol
```



### 3.217 CVF-217

- Severity: Minor
- Status: Opened
- Source: mock
- Category: Suboptimal



**Description:**

We didn't review these files

```
contracts/mock
contracts/mock/Token.sol
```



### 3.218 CVF-218

- Severity: Minor
- Status: Opened
- Source: libraries
- Category: Suboptimal



**Description:**

We didn't review these files.

```
contracts/libraries
contracts/libraries/error
contracts/libraries/math
contracts/libraries/math/SafeMath.sol
contracts/libraries/token
contracts/libraries/token/IERC20.sol
contracts/libraries/token/SafeERC20.sol
contracts/libraries/utils
contracts/libraries/utils/Address.sol
contracts/libraries/utils/ReentrancyGuard.sol
contracts/libraries/Constants.sol
contracts/libraries/DataTypes.sol
contracts/libraries/Errors.sol
contracts/libraries/Events.sol
```



### 3.219 CVF-219

- Severity: Minor
- Status: Opened
- Source: cmx
- Category: Suboptimal



**Description:**

We didn't review these files

```
contracts/gmx
contracts/gmx/GMX.sol
contracts/gmx/MLP.sol
```





### 3.220 CVF-220

- Severity: Minor
- Status: Opened
- Source: amm
- Category: Suboptimal



**Description:**

We didn't review these files:



```
contracts/amm
contracts/amm/interfaces
contracts/amm/interfaces/IPancakeFactory.sol
contracts/amm/interfaces/IPancakePair.sol
```



### 3.221 CVF-221

- Severity: Minor
- Status: Opened
- Source: access
- Category: Suboptimal



**Description:**

We didn't review these files

```
contracts/access
contracts/access/interfaces
contracts/access/interfaces/IAdmin.sol
contracts/access/Governable.sol
```



### 3.222 CVF-222

- Severity: Minor
- Status: Opened
- Source: referrals
- Category: Suboptimal



**Description:**

We didn't review these files:

```
contracts/referrals
contracts/referrals/interfaces
contracts/referrals/interfaces/IReferralStorage.sol
```





### 3.223 CVF-223

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Suboptimal



**Description:**

Deleting the variable `whitelistedTokens`, may make the function vulnerable to reentrancy attacks.



```
contracts/core/Vault.sol:27

        delete whitelistedTokens[_token];
        delete tokenDecimals[_token];
        delete tokenWeights[_token];
        delete minProfitBasisPoints[_token];
        delete maxUsdmAmounts[_token];
        delete stableTokens[_token];
        delete shortableTokens[_token];
```



### 3.224 CVF-224

- Severity: Moderate
- Status: Opened
- Source: Vault.sol
- Category: Suboptimal

**Description:**

Deleting the variable `positions`, may make the function vulnerable to reentrancy attacks.



```
contracts/core/Vault.sol:245

delete positions[key];
```





### 3.225 CVF-225

- Severity: Minor
- Status: Opened
- Source: Vault.sol
- Category: Suboptimal



**Description:**

Deleting the variable `positions`, may make the function vulnerable to reentrancy attacks.



```
contracts/core/Vault.sol:305

delete positions[key];
```




