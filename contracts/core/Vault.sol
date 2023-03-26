// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./settings/VaultInternal.sol";
contract Vault is VaultInternal {
    constructor() public {
        gov = msg.sender;
    }
}
