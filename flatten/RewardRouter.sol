// Sources flattened with hardhat v2.7.0 https://hardhat.org

// File contracts/libraries/math/SafeMath.sol

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


// File contracts/libraries/token/IERC20.sol

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


// File contracts/libraries/utils/Address.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.6.2;

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: value }(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data, string memory errorMessage) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.staticcall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.3._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.3._
     */
    function functionDelegateCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    function _verifyCallResult(bool success, bytes memory returndata, string memory errorMessage) private pure returns(bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}


// File contracts/libraries/token/SafeERC20.sol

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;



/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    /**
     * @dev Deprecated. This function has issues similar to the ones found in
     * {IERC20-approve}, and its usage is discouraged.
     *
     * Whenever possible, use {safeIncreaseAllowance} and
     * {safeDecreaseAllowance} instead.
     */
    function safeApprove(IERC20 token, address spender, uint256 value) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        // solhint-disable-next-line max-line-length
        require((value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).add(value);
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).sub(value, "SafeERC20: decreased allowance below zero");
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");
        if (returndata.length > 0) { // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}


// File contracts/libraries/utils/ReentrancyGuard.sol

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor () internal {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}


// File contracts/staking/interfaces/IRewardTracker.sol

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IRewardTracker {
    function depositBalances(address _account, address _depositToken) external view returns (uint256);
    function stakedAmounts(address _account) external view returns (uint256);
    function updateRewards() external;
    function stake(address _depositToken, uint256 _amount) external;
    function stakeForAccount(address _fundingAccount, address _account, address _depositToken, uint256 _amount) external;
    function unstake(address _depositToken, uint256 _amount) external;
    function unstakeForAccount(address _account, address _depositToken, uint256 _amount, address _receiver) external;
    function tokensPerInterval() external view returns (uint256);
    function claim(address _receiver) external returns (uint256);
    function claimForAccount(address _account, address _receiver) external returns (uint256);
    function claimable(address _account) external view returns (uint256);
    function averageStakedAmounts(address _account) external view returns (uint256);
    function cumulativeRewards(address _account) external view returns (uint256);
}


// File contracts/staking/interfaces/IVester.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
interface IVester {
    function rewardTracker() external view returns (address);
    function claimForAccount(address _account, address _receiver) external returns (uint256);
    function claimable(address _account) external view returns (uint256);
    function cumulativeClaimAmounts(address _account) external view returns (uint256);
    function claimedAmounts(address _account) external view returns (uint256);
    function pairAmounts(address _account) external view returns (uint256);
    function getVestedAmount(address _account) external view returns (uint256);
    function transferredAverageStakedAmounts(address _account) external view returns (uint256);
    function transferredCumulativeRewards(address _account) external view returns (uint256);
    function cumulativeRewardDeductions(address _account) external view returns (uint256);
    function bonusRewards(address _account) external view returns (uint256);
    function transferStakeValues(address _sender, address _receiver) external;
    function setTransferredAverageStakedAmounts(address _account, uint256 _amount) external;
    function setTransferredCumulativeRewards(address _account, uint256 _amount) external;
    function setCumulativeRewardDeductions(address _account, uint256 _amount) external;
    function setBonusRewards(address _account, uint256 _amount) external;
    function getMaxVestableAmount(address _account) external view returns (uint256);
    function getCombinedAverageStakedAmount(address _account) external view returns (uint256);
}


// File contracts/tokens/interfaces/IMintable.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
interface IMintable {
    function isMinter(address _account) external returns (bool);
    function setMinter(address _minter, bool _isActive) external;
    function mint(address _account, uint256 _amount) external;
    function burn(address _account, uint256 _amount) external;
}


// File contracts/tokens/interfaces/IWETH.sol

//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
}


// File contracts/core/interfaces/IMlpManager.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
interface IMlpManager {
    function usdm() external view returns (address);
    function cooldownDuration() external returns (uint256);
    function getAumInUsdm(bool maximise) external view returns (uint256);
    function lastAddedAt(address _account) external returns (uint256);
    function addLiquidity(address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external returns (uint256);
    function addLiquidityForAccount(address _fundingAccount, address _account, address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external returns (uint256);
    function removeLiquidity(address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external returns (uint256);
    function removeLiquidityForAccount(address _account, address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external returns (uint256);
}


// File contracts/access/Governable.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
contract Governable {
    address public gov;
    constructor() public {
        gov = msg.sender;
    }
    modifier onlyGov() {
        require(msg.sender == gov, "Governable: forbidden");
        _;
    }
    function setGov(address _gov) external onlyGov {
        gov = _gov;
    }
}


// File contracts/libraries/Events.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

library Events {
    /* BasePositionManager Events */
    event SetDepositFee(uint256 depositFee);
    event SetIncreasePositionBufferBps(uint256 increasePositionBufferBps);
    event SetReferralStorage(address referralStorage);
    event SetAdmin(address admin);
    event WithdrawFees(address token, address receiver, uint256 amount);
    event SetMaxGlobalSizes(address[] tokens, uint256[] longSizes, uint256[] shortSizes);
    event IncreasePositionReferral(address account, uint256 sizeDelta, uint256 marginFeeBasisPoints, bytes32 referralCode, address referrer);
    event DecreasePositionReferral(address account, uint256 sizeDelta, uint256 marginFeeBasisPoints, bytes32 referralCode, address referrer);

    /*Position Manager Events*/
    event SetOrderKeeper(address indexed account, bool isActive);
    event SetLiquidator(address indexed account, bool isActive);
    event SetPartner(address account, bool isActive);
    event SetOpened(bool opened);
    event SetShouldValidateIncreaseOrder(bool shouldValidateIncreaseOrder);


    /* Orderbook.sol events */
    event CreateIncreaseOrder(address indexed account, uint256 orderIndex, address purchaseToken, uint256 purchaseTokenAmount, address collateralToken, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee);
    event CancelIncreaseOrder(address indexed account, uint256 orderIndex, address purchaseToken, uint256 purchaseTokenAmount, address collateralToken, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee);
    event ExecuteIncreaseOrder(address indexed account, uint256 orderIndex, address purchaseToken, uint256 purchaseTokenAmount, address collateralToken, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee, uint256 executionPrice);
    event UpdateIncreaseOrder(address indexed account, uint256 orderIndex, address collateralToken, address indexToken, bool isLong, uint256 sizeDelta, uint256 triggerPrice, bool triggerAboveThreshold);
    event CreateDecreaseOrder(address indexed account, uint256 orderIndex, address collateralToken, uint256 collateralDelta, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee);
    event CancelDecreaseOrder(address indexed account, uint256 orderIndex, address collateralToken, uint256 collateralDelta, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee);
    event ExecuteDecreaseOrder(address indexed account, uint256 orderIndex, address collateralToken, uint256 collateralDelta, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold, uint256 executionFee, uint256 executionPrice);
    event UpdateDecreaseOrder(address indexed account, uint256 orderIndex, address collateralToken, uint256 collateralDelta, address indexToken, uint256 sizeDelta, bool isLong, uint256 triggerPrice, bool triggerAboveThreshold);
    event CreateSwapOrder(address indexed account, uint256 orderIndex, address[] path, uint256 amountIn, uint256 minOut, uint256 triggerRatio, bool triggerAboveThreshold, bool shouldUnwrap, uint256 executionFee);
    event CancelSwapOrder(address indexed account, uint256 orderIndex, address[] path, uint256 amountIn, uint256 minOut, uint256 triggerRatio, bool triggerAboveThreshold, bool shouldUnwrap, uint256 executionFee);
    event UpdateSwapOrder(address indexed account, uint256 ordexIndex, address[] path, uint256 amountIn, uint256 minOut, uint256 triggerRatio, bool triggerAboveThreshold, bool shouldUnwrap, uint256 executionFee);
    event ExecuteSwapOrder(address indexed account, uint256 orderIndex, address[] path, uint256 amountIn, uint256 minOut, uint256 amountOut, uint256 triggerRatio, bool triggerAboveThreshold, bool shouldUnwrap, uint256 executionFee);
    event Initialize(address router, address vault, address weth, address usdm, uint256 minExecutionFee, uint256 minPurchaseTokenAmountUsd);
    event UpdateMinExecutionFee(uint256 minExecutionFee);
    event UpdateMinPurchaseTokenAmountUsd(uint256 minPurchaseTokenAmountUsd);
    event UpdateGov(address gov);

    /* Router.sol events*/
    event Swap(address account, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut);

    /* ShortsTracker.sol events*/
    event GlobalShortDataUpdated(address indexed token, uint256 globalShortSize, uint256 globalShortAveragePrice);

    /* Vault.sol events */
    event BuyUSDM(address account, address token, uint256 tokenAmount, uint256 usdmAmount, uint256 feeBasisPoints);
    event SellUSDM(address account, address token, uint256 usdmAmount, uint256 tokenAmount, uint256 feeBasisPoints);
    event Swap(address account, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut, uint256 amountOutAfterFees, uint256 feeBasisPoints);
    event IncreasePosition(bytes32 key, address account, address collateralToken, address indexToken, uint256 collateralDelta, uint256 sizeDelta, bool isLong, uint256 price, uint256 fee);
    event DecreasePosition(bytes32 key, address account, address collateralToken, address indexToken, uint256 collateralDelta, uint256 sizeDelta, bool isLong, uint256 price, uint256 fee);
    event LiquidatePosition(bytes32 key, address account, address collateralToken, address indexToken, bool isLong, uint256 size, uint256 collateral, uint256 reserveAmount, int256 realisedPnl, uint256 markPrice);
    event UpdatePosition(bytes32 key, uint256 size, uint256 collateral, uint256 averagePrice, uint256 entryFundingRate, uint256 reserveAmount, int256 realisedPnl, uint256 markPrice);
    event ClosePosition(bytes32 key, uint256 size, uint256 collateral, uint256 averagePrice, uint256 entryFundingRate, uint256 reserveAmount, int256 realisedPnl);
    event UpdateFundingRate(address token, uint256 fundingRate);
    event UpdatePnl(bytes32 key, bool hasProfit, uint256 delta);
    event CollectSwapFees(address token, uint256 feeUsd, uint256 feeTokens);
    event CollectMarginFees(address token, uint256 feeUsd, uint256 feeTokens);
    event DirectPoolDeposit(address token, uint256 amount);
    event IncreasePoolAmount(address token, uint256 amount);
    event DecreasePoolAmount(address token, uint256 amount);
    event IncreaseUsdmAmount(address token, uint256 amount);
    event DecreaseUsdmAmount(address token, uint256 amount);
    event IncreaseReservedAmount(address token, uint256 amount);
    event DecreaseReservedAmount(address token, uint256 amount);
    event IncreaseGuaranteedUsd(address token, uint256 amount);
    event DecreaseGuaranteedUsd(address token, uint256 amount);

    /* Timelock.sol events */
    event SignalPendingAction(bytes32 action);
    event SignalApprove(address token, address spender, uint256 amount, bytes32 action);
    event SignalWithdrawToken(address target, address token, address receiver, uint256 amount, bytes32 action);
    event SignalMint(address token, address receiver, uint256 amount, bytes32 action);
    event SignalSetGov(address target, address gov, bytes32 action);
    event SignalSetHandler(address target, address handler, bool isActive, bytes32 action);
    event SignalSetPriceFeed(address vault, address priceFeed, bytes32 action);
    event SignalRedeemUsdm(address vault, address token, uint256 amount);
    event SignalVaultSetTokenConfig(address vault, address token, uint256 tokenDecimals, uint256 tokenWeight, uint256 minProfitBps, uint256 maxUsdmAmount, bool isStable, bool isShortable);
    event ClearAction(bytes32 action);

    /* MlpManager.sol */
    event AddLiquidity(address account, address token, uint256 amount, uint256 aumInUsdm, uint256 mlpSupply, uint256 usdmAmount, uint256 mintAmount);
    event RemoveLiquidity(address account, address token, uint256 mlpAmount, uint256 aumInUsdm, uint256 mlpSupply, uint256 usdmAmount, uint256 amountOut);

    /* RewardRouterV2 */
    event StakeMold(address account, address token, uint256 amount);
    event UnstakeMold(address account, address token, uint256 amount);
    event StakeMlp(address account, uint256 amount);
    event UnstakeMlp(address account, uint256 amount);
}


// File contracts/libraries/Errors.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
library Errors {
    /* Timelock Error Message*/
    string public constant Timelock_Invalid_Target = "Timelock: invalid _target";
    string public constant Timelock_Invalid_Buffer = "Timelock: invalid _buffer";
    string public constant Timelock_Buffer_Cannot_Be_Decreased = "Timelock: buffer cannot be decreased";
    string public constant Timelock_invalid_maxLeverage = "Timelock: invalid _maxLeverage";
    string public constant Timelock_invalid_fundingRateFactor = "Timelock: invalid _fundingRateFactor";
    string public constant Timelock_invalid_stableFundingRateFactor = "Timelock: invalid _stableFundingRateFactor";
    string public constant Timelock_invalid_minProfitBps = "Timelock: invalid _minProfitBps";
    string public constant Timelock_token_not_yet_whitelisted = "Timelock: token not yet whitelisted";
    string public constant TIMELOCK_INVALID_MAXGASPRICE = "Invalid _maxGasPrice";
    string public constant TIMELOCK_INVALID_LENGTHS = "Timelock: invalid lengths";
    string public constant TIMELOCK_MAXTOKENSUPPLY_EXCEEDED = "Timelock: maxTokenSupply exceeded";
    string public constant TIMELOCK_ACTION_ALREADY_SIGNALLED = "Timelock: action already signalled";
    string public constant TIMELOCK_ACTION_NOT_SIGNALLED = "Timelock: action not signalled";
    string public constant TIMELOCK_ACTION_TIME_NOT_YET_PASSED = "Timelock: action time not yet passed";
    string public constant TIMELOCK_INVALID_ACTION = "Timelock: invalid _action";
    string public constant TIMELOCK_INVALID_BUFFER = "Timelock: invalid _buffer";

    /* PriceFeed Error Message*/
    string public constant PriceFeed_forbidden = "PriceFeed: forbidden";

    /* USDM.sol*/
    string public constant USDM_FORBIDDEN = "USDM: forbidden";

    /* BasePositionManagers.sol */
    string public constant BASEPOSITIONMANAGER_MARK_PRICE_LOWER_THAN_LIMIT      = "BasePositionManager: mark price lower than limit";
    string public constant BASEPOSITIONMANAGER_MARK_PRICE_HIGHER_THAN_LIMIT     = "BasePositionManager: mark price higher than limit";
    string public constant BASEPOSITIONMANAGER_INVALID_PATH_LENGTH              = "BasePositionManager: invalid _path.length";
    string public constant BASEPOSITIONMANAGER_INSUFFICIENT_AMOUNTOUT           = "BasePositionManager: insufficient amountOut";
    string public constant BASEPOSITIONMANAGER_MAX_GLOBAL_LONGS_EXCEEDED        = "BasePositionManager: max global longs exceeded";
    string public constant BASEPOSITIONMANAGER_MAX_GLOBAL_SHORTS_EXCEEDED       = "BasePositionManager: max global shorts exceeded";
    string public constant BASEPOSITIONMANAGER_INVALID_SENDER                   = "BasePositionManager: invalid sender";

    /* PositionManager.sol */
    string public constant POSITIONMANAGER_INVALID_PATH_LENGTH                  = "PositionManager: invalid _path.length";
    string public constant POSITIONMANAGER_INVALID_PATH                         = "PositionManager: invalid _path";
    string public constant POSITIONMANAGER_LONG_DEPOSIT                         = "PositionManager: long deposit";
    string public constant POSITIONMANAGER_LONG_LEVERAGE_DECREASE               = "PositionManager: long leverage decrease";
    string public constant POSITIONMANAGER_FORBIDDEN                            = "PositionManager: forbidden";

    /* Router.sol*/
    string public constant ROUTER_FORBIDDEN                                     = "Router: forbidden";

    /* MlpManager.sol */
    string public constant MLPMANAGER_ACTION_NOT_ENABLED                        = "MlpManager: action not enabled";
    string public constant MLPMANAGER_INVALID_WEIGHT                            = "MlpManager: invalid weight";
    string public constant MLPMANAGER_INVALID_COOLDOWNDURATION                  = "MlpManager: invalid _cooldownDuration";
    string public constant MLPMANAGER_INVALID_AMOUNT                            = "MlpManager: invalid _amount";
    string public constant MLPMANAGER_INSUFFICIENT_USDM_OUTPUT                  = "MlpManager: insufficient USDM output";
    string public constant MLPMANAGER_INSUFFICIENT_MLP_OUTPUT                   = "MlpManager: insufficient MLP output";
    string public constant MLPMANAGER_INVALID_MLPAMOUNT                         = "MlpManager: invalid _mlpAmount";
    string public constant MLPMANAGER_COOLDOWN_DURATION_NOT_YET_PASSED          = "MlpManager: cooldown duration not yet passed";
    string public constant MLPMANAGER_INSUFFICIENT_OUTPUT                       = "MlpManager: insufficient output";
    string public constant MLPMANAGER_FORBIDDEN                                 = "MlpManager: forbidden";

    /* ShortsTrack.sol*/
    string public constant SHORTSTRACKER_FORBIDDEN                              = "ShortsTracker: forbidden";
    string public constant SHORTSTRACKER_INVALID_HANDLER                        = "ShortsTracker: invalid _handler";
    string public constant SHORTSTRACKER_ALREADY_MIGRATED                       = "ShortsTracker: already migrated";
    string public constant SHORTSTRACKER_OVERFLOW                               = "ShortsTracker: overflow";

    /* VaultUtils.sol*/
    string public constant VAULT_LOSSES_EXCEED_COLLATERAL                       = "Vault: losses exceed collateral";
    string public constant VAULT_FEES_EXCEED_COLLATERAL                         = "Vault: fees exceed collateral";
    string public constant VAULT_LIQUIDATION_FEES_EXCEED_COLLATERAL             = "Vault: liquidation fees exceed collateral";
    string public constant VAULT_MAXLEVERAGE_EXCEEDED                           = "Vault: maxLeverage exceeded";

    /* VaultPriceFeed.sol*/
    string public constant VAULTPRICEFEED_FORBIDDEN                             = "VaultPriceFeed: forbidden";
    string public constant VAULTPRICEFEED_ADJUSTMENT_FREQUENCY_EXCEEDED         = "VaultPriceFeed: adjustment frequency exceeded";
    string public constant VAULTPRICEFEED_INVALID_ADJUSTMENTBPS                 = "Vaultpricefeed: invalid _adjustmentBps";
    string public constant VAULTPRICEFEED_INVALID_SPREADBASISPOINTS             = "VaultPriceFeed: invalid _spreadBasisPoints";
    string public constant VAULTPRICEFEED_INVALID_PRICESAMPLESPACE              = "VaultPriceFeed: invalid _priceSampleSpace";
    string internal constant VAULTPRICEFEED_INVALID_PRICE_FEED                  = "VaultPriceFeed: invalid price feed";
    string internal constant VAULTPRICEFEED_INVALID_PRICE                       = "VaultPriceFeed: invalid price";
    string internal constant CHAINLINK_FEEDS_ARE_NOT_BEING_UPDATED              = "Chainlink feeds are not being updated";
    string internal constant VAULTPRICEFEED_COULD_NOT_FETCH_PRICE               = "VaultPriceFeed: could not fetch price";

    /* VaultInternal.sol*/
    string internal constant VAULT_POOLAMOUNT_EXCEEDED                          = "Vault: poolAmount exceeded";
    string internal constant VAULT_INSUFFICIENT_RESERVE                         = "Vault: insufficient reserve";
    string internal constant VAULT_MAX_SHORTS_EXCEEDED                          = "Vault: max shorts exceeded";
    string internal constant VAULT_POOLAMOUNT_BUFFER                            = "Vault: poolAmount < buffer";
    string internal constant VAULT_INVALID_ERRORCONTROLLER                      = "Vault: invalid errorController";

    /* Router.sol */
    string internal constant ROUTER_INVALID_SENDER                              = "Router: invalid sender";
    string internal constant ROUTER_INVALID_PATH                                = "Router: invalid _path";
    string internal constant ROUTER_MARK_PRICE_HIGHER_THAN_LIMIT                = "Router: mark price higher than limit";
    string internal constant ROUTER_MARK_PRICE_LOWER_THAN_LIMIT                 = "Router: mark price lower than limit";
    string internal constant ROUTER_INVALID_PATH_LENGTH                         = "Router: invalid _path.length";
    string internal constant ROUTER_INSUFFICIENT_AMOUNTOUT                      = "Router: insufficient amountOut";
    string internal constant ROUTER_INVALID_PLUGIN                              = "Router: invalid plugin";
    string internal constant ROUTER_PLUGIN_NOT_APPROVED                         = "Router: plugin not approved";

    /* OrderBook.sol*/
    string internal constant ORDERBOOK_FORBIDDEN                                = "OrderBook: forbidden";
    string internal constant ORDERBOOK_ALREADY_INITIALIZED                      = "OrderBook: already initialized";
    string internal constant ORDERBOOK_INVALID_SENDER                           = "OrderBook: invalid sender";
    string internal constant ORDERBOOK_INVALID_PATH_LENGTH                      = "OrderBook: invalid _path.length";
    string internal constant ORDERBOOK_INVALID_PATH                             = "OrderBook: invalid _path";
    string internal constant ORDERBOOK_INVALID_AMOUNTIN                         = "OrderBook: invalid _amountIn";
    string internal constant ORDERBOOK_INSUFFICIENT_EXECUTION_FEE               = "OrderBook: insufficient execution fee";
    string internal constant ORDERBOOK_ONLY_WETH_COULD_BE_WRAPPED               = "OrderBook: only weth could be wrapped";
    string internal constant ORDERBOOK_INCORRECT_VALUE_TRANSFERRED              = "OrderBook: incorrect value transferred";
    string internal constant ORDERBOOK_INCORRECT_EXECUTION_FEE_TRANSFERRED      = "OrderBook: incorrect execution fee transferred";
    string internal constant ORDERBOOK_NON_EXISTENT_ORDER                       = "OrderBook: non-existent order";
    string internal constant ORDERBOOK_INVALID_PRICE_FOR_EXECUTION              = "OrderBook: invalid price for execution";
    string internal constant ORDERBOOK_INSUFFICIENT_COLLATERAL                  = "OrderBook: insufficient collateral";
    string internal constant ORDERBOOK_INSUFFICIENT_AMOUNTOUT                   = "OrderBook: insufficient amountOut";

    /* RewardRouterV2.sol */
    string internal constant REWARDROUTER_INVALID_AMOUNT                        = "RewardRouter: invalid _amount";
    string internal constant REWARDROUTER_INVALID_MSG_VALUE                     = "RewardRouter: invalid msg.value";
    string internal constant REWARDROUTER_ALREADY_INITIALIZED                   = "RewardRouter: already initialized";
    string internal constant REWARDROUTER_INVALID_MLPAMOUNT                     = "RewardRouter: invalid _mlpAmount";
    string internal constant REWARDROUTER_SENDER_HAS_VESTED_TOKENS              = "RewardRouter: sender has vested tokens";
    string internal constant REWARDROUTER_TRANSFER_NOT_SIGNALLED                = "RewardRouter: transfer not signalled";
    string internal constant REWARDROUTER_STAKEDMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0                      = "RewardRouter: stakedMoldTracker.averageStakedAmounts > 0";
    string internal constant REWARDROUTER_STAKEDMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0                         = "RewardRouter: stakedMoldTracker.cumulativeRewards > 0";
    string internal constant REWARDROUTER_BONUSMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0                       = "RewardRouter: bonusMoldTracker.averageStakedAmounts > 0";
    string internal constant REWARDROUTER_BONUSMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0                          = "RewardRouter: bonusMoldTracker.cumulativeRewards > 0";
    string internal constant REWARDROUTER_FEEMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0                         = "RewardRouter: feeMoldTracker.averageStakedAmounts > 0";
    string internal constant REWARDROUTER_FEEMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0                            = "RewardRouter: feeMoldTracker.cumulativeRewards > 0";
    string internal constant REWARDROUTER_MOLDVESTER_TRANSFERREDAVERAGESTAKEDAMOUNTS_GREATER_0                  = "RewardRouter: MoldVester.transferredAverageStakedAmounts > 0";
    string internal constant REWARDROUTER_MOLDVESTER_TRANSFERREDCUMULATIVEREWARDS_GREATER_0                     = "RewardRouter: MoldVester.transferredCumulativeRewards > 0";
    string internal constant REWARDROUTER_STAKEDMLPTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0                       = "RewardRouter: stakedMlpTracker.averageStakedAmounts > 0";
    string internal constant REWARDROUTER_STAKEDMLPTRACKER_CUMULATIVEREWARDS_GREATER_0                          = "RewardRouter: stakedMlpTracker.cumulativeRewards > 0";
    string internal constant REWARDROUTER_FEEMLPTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0                          = "RewardRouter: feeMlpTracker.averageStakedAmounts > 0";
    string internal constant REWARDROUTER_FEEMLPTRACKER_CUMULATIVEREWARDS_GREATER_0                             = "RewardRouter: feeMlpTracker.cumulativeRewards > 0";
    string internal constant REWARDROUTER_MOLDVESTER_BALANCE_GREATER_0          = "RewardRouter: MoldVester.balance > 0";
    string internal constant REWARDROUTER_MLPVESTER_BALANCE_GREATER_0           = "RewardRouter: MlpVester.balance > 0";

}


// File contracts/core/storage/RewardRouterV2Aggregator.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;












abstract contract RewardRouterV2Aggregator is ReentrancyGuard, Governable {

}


// File contracts/core/storage/RewardRouterV2Storage.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

abstract contract RewardRouterV2Storage is RewardRouterV2Aggregator {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using Address for address payable;
    bool public isInitialized;
    address public weth;
    address public mold;
    address public esMold;
    address public bnMold;
    address public mlp;
    address public stakedMoldTracker;
    address public bonusMoldTracker;
    address public feeMoldTracker;
    address public stakedMlpTracker;
    address public feeMlpTracker;
    address public mlpManager;
    address public mlpVester;
    address public moldVester;
    mapping (address => address) public pendingReceivers;
}


// File contracts/core/settings/RewardRouterV2Settings.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

abstract contract RewardRouterV2Settings is RewardRouterV2Storage {
    function initialize(address _weth, address _mold, address _esMold, address _bnMold, address _mlp, address _stakedMoldTracker, address _bonusMoldTracker, address _feeMoldTracker, address _feeMlpTracker, address _stakedMlpTracker, address _mlpManager, address _moldVester, address _mlpVester) external onlyGov {
        require(!isInitialized, Errors.REWARDROUTER_ALREADY_INITIALIZED);
        isInitialized = true;
        weth = _weth;
        mold = _mold;
        esMold = _esMold;
        bnMold = _bnMold;
        mlp = _mlp;
        stakedMoldTracker = _stakedMoldTracker;
        bonusMoldTracker = _bonusMoldTracker;
        feeMoldTracker = _feeMoldTracker;
        feeMlpTracker = _feeMlpTracker;
        stakedMlpTracker = _stakedMlpTracker;
        mlpManager = _mlpManager;
        moldVester = _moldVester;
        mlpVester = _mlpVester;
    }
//    function withdrawToken(address _token, address _account, uint256 _amount) external onlyGov {
//        IERC20(_token).safeTransfer(_account, _amount);
//    }
//    function batchStakeMoldForAccount(address[] memory _accounts, uint256[] memory _amounts) external nonReentrant onlyGov {
//        address _mold = mold;
//        for (uint256 i = 0; i < _accounts.length; i++) {
//            _stakeMold(msg.sender, _accounts[i], _mold, _amounts[i]);
//        }
//    }
//    function stakeMoldForAccount(address _account, uint256 _amount) external nonReentrant onlyGov {
//        _stakeMold(msg.sender, _account, mold, _amount);
//    }
//    function stakeMold(uint256 _amount) external nonReentrant {
//        _stakeMold(msg.sender, msg.sender, mold, _amount);
//    }
//    function stakeEsMold(uint256 _amount) external nonReentrant {
//        _stakeMold(msg.sender, msg.sender, esMold, _amount);
//    }
//    function unstakeMold(uint256 _amount) external nonReentrant {
//        _unstakeMold(msg.sender, mold, _amount, true);
//    }
//    function unstakeEsMold(uint256 _amount) external nonReentrant {
//        _unstakeMold(msg.sender, esMold, _amount, true);
//    }
//    function unstakeAndRedeemMlp(address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external nonReentrant returns (uint256) {
//        require(_mlpAmount > 0, Errors.REWARDROUTER_INVALID_MLPAMOUNT);
//        address account = msg.sender;
//        IRewardTracker(stakedMlpTracker).unstakeForAccount(account, feeMlpTracker, _mlpAmount, account);
//        IRewardTracker(feeMlpTracker).unstakeForAccount(account, mlp, _mlpAmount, account);
//        uint256 amountOut = IMlpManager(mlpManager).removeLiquidityForAccount(account, _tokenOut, _mlpAmount, _minOut, _receiver);
//        emit Events.UnstakeMlp(account, _mlpAmount);
//        return amountOut;
//    }
//    function unstakeAndRedeemMlpETH(uint256 _mlpAmount, uint256 _minOut, address payable _receiver) external nonReentrant returns (uint256) {
//        require(_mlpAmount > 0, Errors.REWARDROUTER_INVALID_MLPAMOUNT);
//        address account = msg.sender;
//        IRewardTracker(stakedMlpTracker).unstakeForAccount(account, feeMlpTracker, _mlpAmount, account);
//        IRewardTracker(feeMlpTracker).unstakeForAccount(account, mlp, _mlpAmount, account);
//        uint256 amountOut = IMlpManager(mlpManager).removeLiquidityForAccount(account, weth, _mlpAmount, _minOut, address(this));
//        IWETH(weth).withdraw(amountOut);
//        _receiver.sendValue(amountOut);
//        emit Events.UnstakeMlp(account, _mlpAmount);
//        return amountOut;
//    }
//    function claim() external nonReentrant {
//        address account = msg.sender;
//        IRewardTracker(feeMoldTracker).claimForAccount(account, account);
//        IRewardTracker(feeMlpTracker).claimForAccount(account, account);
//        IRewardTracker(stakedMoldTracker).claimForAccount(account, account);
//        IRewardTracker(stakedMlpTracker).claimForAccount(account, account);
//    }
//    function claimEsMold() external nonReentrant {
//        address account = msg.sender;
//        IRewardTracker(stakedMoldTracker).claimForAccount(account, account);
//        IRewardTracker(stakedMlpTracker).claimForAccount(account, account);
//    }
//    function claimFees() external nonReentrant {
//        address account = msg.sender;
//
//        IRewardTracker(feeMoldTracker).claimForAccount(account, account);
//        IRewardTracker(feeMlpTracker).claimForAccount(account, account);
//    }
//    function compound() external nonReentrant {
//        _compound(msg.sender);
//    }
//    function compoundForAccount(address _account) external nonReentrant onlyGov {
//        _compound(_account);
//    }
//    function handleRewards(bool _shouldClaimMold, bool _shouldStakeMold, bool _shouldClaimEsMold, bool _shouldStakeEsMold, bool _shouldStakeMultiplierPoints, bool _shouldClaimWeth, bool _shouldConvertWethToEth) external nonReentrant {
//        address account = msg.sender;
//        uint256 moldAmount = 0;
//        if (_shouldClaimMold) {
//            uint256 moldAmount0 = IVester(moldVester).claimForAccount(account, account);
//            uint256 moldAmount1 = IVester(mlpVester).claimForAccount(account, account);
//            moldAmount = moldAmount0.add(moldAmount1);
//        }
//        if (_shouldStakeMold && moldAmount > 0) {
//            _stakeMold(account, account, mold, moldAmount);
//        }
//        uint256 esMoldAmount = 0;
//        if (_shouldClaimEsMold) {
//            uint256 esMoldAmount0 = IRewardTracker(stakedMoldTracker).claimForAccount(account, account);
//            uint256 esMoldAmount1 = IRewardTracker(stakedMlpTracker).claimForAccount(account, account);
//            esMoldAmount = esMoldAmount0.add(esMoldAmount1);
//        }
//        if (_shouldStakeEsMold && esMoldAmount > 0) {
//            _stakeMold(account, account, esMold, esMoldAmount);
//        }
//        if (_shouldStakeMultiplierPoints) {
//            uint256 bnMoldAmount = IRewardTracker(bonusMoldTracker).claimForAccount(account, account);
//            if (bnMoldAmount > 0) {
//                IRewardTracker(feeMoldTracker).stakeForAccount(account, account, bnMold, bnMoldAmount);
//            }
//        }
//        if (_shouldClaimWeth) {
//            if (_shouldConvertWethToEth) {
//                uint256 weth0 = IRewardTracker(feeMoldTracker).claimForAccount(account, address(this));
//                uint256 weth1 = IRewardTracker(feeMlpTracker).claimForAccount(account, address(this));
//                uint256 wethAmount = weth0.add(weth1);
//                IWETH(weth).withdraw(wethAmount);
//                payable(account).sendValue(wethAmount);
//            } else {
//                IRewardTracker(feeMoldTracker).claimForAccount(account, account);
//                IRewardTracker(feeMlpTracker).claimForAccount(account, account);
//            }
//        }
//    }
//    function batchCompoundForAccounts(address[] memory _accounts) external nonReentrant onlyGov {
//        for (uint256 i = 0; i < _accounts.length; i++) {
//            _compound(_accounts[i]);
//        }
//    }
//    function signalTransfer(address _receiver) external nonReentrant {
//        require(IERC20(moldVester).balanceOf(msg.sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        require(IERC20(mlpVester).balanceOf(msg.sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        _validateReceiver(_receiver);
//        pendingReceivers[msg.sender] = _receiver;
//    }
//    function acceptTransfer(address _sender) external nonReentrant {
//        require(IERC20(moldVester).balanceOf(_sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        require(IERC20(mlpVester).balanceOf(_sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        address receiver = msg.sender;
//        require(pendingReceivers[_sender] == receiver, Errors.REWARDROUTER_TRANSFER_NOT_SIGNALLED);
//        delete pendingReceivers[_sender];
//        _validateReceiver(receiver);
//        _compound(_sender);
//        uint256 stakedMold = IRewardTracker(stakedMoldTracker).depositBalances(_sender, mold);
//        if (stakedMold > 0) {
//            _unstakeMold(_sender, mold, stakedMold, false);
//            _stakeMold(_sender, receiver, mold, stakedMold);
//        }
//        uint256 stakedEsMold = IRewardTracker(stakedMoldTracker).depositBalances(_sender, esMold);
//        if (stakedEsMold > 0) {
//            _unstakeMold(_sender, esMold, stakedEsMold, false);
//            _stakeMold(_sender, receiver, esMold, stakedEsMold);
//        }
//        uint256 stakedBnMold = IRewardTracker(feeMoldTracker).depositBalances(_sender, bnMold);
//        if (stakedBnMold > 0) {
//            IRewardTracker(feeMoldTracker).unstakeForAccount(_sender, bnMold, stakedBnMold, _sender);
//            IRewardTracker(feeMoldTracker).stakeForAccount(_sender, receiver, bnMold, stakedBnMold);
//        }
//        uint256 esMoldBalance = IERC20(esMold).balanceOf(_sender);
//        if (esMoldBalance > 0) {
//            IERC20(esMold).transferFrom(_sender, receiver, esMoldBalance);
//        }
//        uint256 mlpAmount = IRewardTracker(feeMlpTracker).depositBalances(_sender, mlp);
//        if (mlpAmount > 0) {
//            IRewardTracker(stakedMlpTracker).unstakeForAccount(_sender, feeMlpTracker, mlpAmount, _sender);
//            IRewardTracker(feeMlpTracker).unstakeForAccount(_sender, mlp, mlpAmount, _sender);
//
//            IRewardTracker(feeMlpTracker).stakeForAccount(_sender, receiver, mlp, mlpAmount);
//            IRewardTracker(stakedMlpTracker).stakeForAccount(receiver, receiver, feeMlpTracker, mlpAmount);
//        }
//        IVester(moldVester).transferStakeValues(_sender, receiver);
//        IVester(mlpVester).transferStakeValues(_sender, receiver);
//    }
//    function _validateReceiver(address _receiver) private view {
//        require(IRewardTracker(stakedMoldTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_STAKEDMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(stakedMoldTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_STAKEDMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(bonusMoldTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_BONUSMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(bonusMoldTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_BONUSMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(feeMoldTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_FEEMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(feeMoldTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_FEEMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IVester(moldVester).transferredAverageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDAVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IVester(moldVester).transferredCumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDCUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(stakedMlpTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_STAKEDMLPTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(stakedMlpTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_STAKEDMLPTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(feeMlpTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_FEEMLPTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(feeMlpTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_FEEMLPTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IVester(mlpVester).transferredAverageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDAVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IVester(mlpVester).transferredCumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDCUMULATIVEREWARDS_GREATER_0);
//        require(IERC20(moldVester).balanceOf(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_BALANCE_GREATER_0);
//        require(IERC20(mlpVester).balanceOf(_receiver) == 0, Errors.REWARDROUTER_MLPVESTER_BALANCE_GREATER_0);
//    }
//    function _compound(address _account) private {
//        _compoundMold(_account);
//        _compoundMlp(_account);
//    }
//    function _compoundMold(address _account) private {
//        uint256 esMoldAmount = IRewardTracker(stakedMoldTracker).claimForAccount(_account, _account);
//        if (esMoldAmount > 0) {
//            _stakeMold(_account, _account, esMold, esMoldAmount);
//        }
//        uint256 bnMoldAmount = IRewardTracker(bonusMoldTracker).claimForAccount(_account, _account);
//        if (bnMoldAmount > 0) {
//            IRewardTracker(feeMoldTracker).stakeForAccount(_account, _account, bnMold, bnMoldAmount);
//        }
//    }
//    function _compoundMlp(address _account) private {
//        uint256 esMoldAmount = IRewardTracker(stakedMlpTracker).claimForAccount(_account, _account);
//        if (esMoldAmount > 0) {
//            _stakeMold(_account, _account, esMold, esMoldAmount);
//        }
//    }
//    function _stakeMold(address _fundingAccount, address _account, address _token, uint256 _amount) private {
//        require(_amount > 0, Errors.REWARDROUTER_INVALID_AMOUNT);
//        IRewardTracker(stakedMoldTracker).stakeForAccount(_fundingAccount, _account, _token, _amount);
//        IRewardTracker(bonusMoldTracker).stakeForAccount(_account, _account, stakedMoldTracker, _amount);
//        IRewardTracker(feeMoldTracker).stakeForAccount(_account, _account, bonusMoldTracker, _amount);
//        emit Events.StakeMold(_account, _token, _amount);
//    }
//    function _unstakeMold(address _account, address _token, uint256 _amount, bool _shouldReduceBnMold) private {
//        require(_amount > 0, Errors.REWARDROUTER_INVALID_AMOUNT);
//        uint256 balance = IRewardTracker(stakedMoldTracker).stakedAmounts(_account);
//        IRewardTracker(feeMoldTracker).unstakeForAccount(_account, bonusMoldTracker, _amount, _account);
//        IRewardTracker(bonusMoldTracker).unstakeForAccount(_account, stakedMoldTracker, _amount, _account);
//        IRewardTracker(stakedMoldTracker).unstakeForAccount(_account, _token, _amount, _account);
//        if (_shouldReduceBnMold) {
//            uint256 bnMoldAmount = IRewardTracker(bonusMoldTracker).claimForAccount(_account, _account);
//            if (bnMoldAmount > 0) {
//                IRewardTracker(feeMoldTracker).stakeForAccount(_account, _account, bnMold, bnMoldAmount);
//            }
//            uint256 stakedBnMold = IRewardTracker(feeMoldTracker).depositBalances(_account, bnMold);
//            if (stakedBnMold > 0) {
//                uint256 reductionAmount = stakedBnMold.mul(_amount).div(balance);
//                IRewardTracker(feeMoldTracker).unstakeForAccount(_account, bnMold, reductionAmount, _account);
//                IMintable(bnMold).burn(_account, reductionAmount);
//            }
//        }
//        emit Events.UnstakeMold(_account, _token, _amount);
//    }
}


// File contracts/staking/RewardRouterV2.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract RewardRouterV2 is RewardRouterV2Settings {
    receive() external payable {
        require(msg.sender == weth, Errors.ROUTER_INVALID_SENDER);
    }
    function mintAndStakeMlp(address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external nonReentrant returns (uint256) {
        require(_amount > 0, Errors.REWARDROUTER_INVALID_AMOUNT);
        address account = msg.sender;
        uint256 mlpAmount = IMlpManager(mlpManager).addLiquidityForAccount(account, account, _token, _amount, _minUsdm, _minMlp);
        return mlpAmount;
    }
    function mintAndStakeMlpETH(uint256 _minUsdm, uint256 _minMlp) external payable nonReentrant returns (uint256) {
        require(msg.value > 0, Errors.REWARDROUTER_INVALID_MSG_VALUE);
        IWETH(weth).deposit{value: msg.value}();
        IERC20(weth).approve(mlpManager, msg.value);
        address account = msg.sender;
        uint256 mlpAmount = IMlpManager(mlpManager).addLiquidityForAccount(address(this), account, weth, msg.value, _minUsdm, _minMlp);
        return mlpAmount;
    }
}
