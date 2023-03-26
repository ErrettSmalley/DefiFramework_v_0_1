// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./interfaces/IUSDM.sol";
import "../libraries/Constants.sol";
import "../libraries/Errors.sol";
import "./YieldToken.sol";
contract USDM is YieldToken, IUSDM {
    mapping (address => bool) public vaults;
    modifier onlyVault() {
        require(vaults[msg.sender], Errors.USDM_FORBIDDEN);
        _;
    }
    constructor(address _vault) public YieldToken(Constants.USDM_TOKEN_NAME, Constants.USDM_TOKEN_SYMBOL, 0) {
        vaults[_vault] = true;
    }
    function addVault(address _vault) external override onlyGov {
        vaults[_vault] = true;
    }
    function removeVault(address _vault) external override onlyGov {
        vaults[_vault] = false;
    }
    function mint(address _account, uint256 _amount) external override onlyVault {
        _mint(_account, _amount);
    }
    function burn(address _account, uint256 _amount) external override onlyVault {
        _burn(_account, _amount);
    }
}
