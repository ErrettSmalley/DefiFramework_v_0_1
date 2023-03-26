// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
import "./settings/VaultInternal.sol";
contract Vault is VaultInternal {
    constructor() public {
        gov = msg.sender;
    }
}
