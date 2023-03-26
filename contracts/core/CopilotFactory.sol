// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./CopilotA.sol";
contract CopilotFactory {
    address[] public copilotAAddresses;
    function createCopilotA(address _token) external returns(address){
        CopilotA copilotA = new CopilotA(_token);
        copilotAAddresses.push(address(copilotA));
        return address(copilotA);
    }
}
