// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./CopilotAStorage.sol";
abstract contract CopilotASettings is CopilotAStorage{
    function setName(string memory _name) external onlyOwner{
        name = _name;
    }
    function setSymbol(string memory _symbol) external onlyOwner{
        symbol = _symbol;
    }
    function setToken(IERC20 _token) external onlyOwner{
        token = _token;
    }
}
