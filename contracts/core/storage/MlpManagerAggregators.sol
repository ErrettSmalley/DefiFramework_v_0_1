// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "../../libraries/math/SafeMath.sol";
import "../../libraries/token/IERC20.sol";
import "../../libraries/token/SafeERC20.sol";
import "../../libraries/Events.sol";
import "../../libraries/Errors.sol";
import "../../libraries/Constants.sol";
import "../../libraries/utils/ReentrancyGuard.sol";
import "../interfaces/IVault.sol";
import "../interfaces/IShortsTracker.sol";
import "../interfaces/IMlpManager.sol";
import "../../tokens/interfaces/IUSDM.sol";
import "../../tokens/interfaces/IMintable.sol";
import "../../access/Governable.sol";
abstract contract MlpManagerAggregators is IMlpManager, ReentrancyGuard, Governable {
}
