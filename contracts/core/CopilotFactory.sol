// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./CopilotA.sol";
contract CopilotFactory {
    address[] public copilotAAddresses;
    function createCopilotA(address _token, string memory _name, string memory _symbol) external returns(address){
        CopilotA copilotA = new CopilotA(_token,_name,_symbol);
        copilotAAddresses.push(address(copilotA));
        return address(copilotA);
    }
}
