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

























































