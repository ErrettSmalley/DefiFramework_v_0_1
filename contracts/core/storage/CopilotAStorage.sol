// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CopilotAStorage is Ownable{
    string public name;
    string public symbol;
    IERC20 public token;

    mapping(address => uint256) public tokenBalance;
}
