// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./storage/CopilotASettings.sol";
contract CopilotA is CopilotASettings {
    constructor(){
        name = "CopilotA";
        symbol = "CPA";
    }
}
