// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MockB is ERC20 {
    constructor(uint256 initialSupply) ERC20("MockB", "MKB") {
        _mint(msg.sender, initialSupply);
    }
}