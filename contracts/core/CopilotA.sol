// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./storage/CopilotASettings.sol";
contract CopilotA is CopilotASettings {
    constructor(address _token){
        name = "CopilotA";
        symbol = "CPA";
        token = IERC20(_token);
    }

    function deposit(uint256 _amount) external {
        token.transferFrom(msg.sender, address(this), _amount);
        tokenBalances[msg.sender] += _amount;
    }

    function withdraw(uint256 _amount) external {
        require(tokenBalances[msg.sender] >= _amount, "Insufficient balance");
        token.transfer(msg.sender, _amount);
        tokenBalances[msg.sender] -= _amount;
    }
}
