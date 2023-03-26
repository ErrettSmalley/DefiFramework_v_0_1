// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./storage/CopilotASettings.sol";
contract CopilotA is CopilotASettings {
    constructor(address _token){
        name = "CopilotA";
        symbol = "CPA";
        token = IERC20(_token);
    }


}
