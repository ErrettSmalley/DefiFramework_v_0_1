// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./VaultAggregators.sol";
abstract contract VaultStorage is VaultAggregators {
    address public gov;
}
