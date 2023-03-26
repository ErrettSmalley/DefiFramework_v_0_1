// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract CopilotAStorage {
    string public name;
    string public symbol;
    IERC20 public token;

    mapping(address => uint256) public tokenBalance;
}
