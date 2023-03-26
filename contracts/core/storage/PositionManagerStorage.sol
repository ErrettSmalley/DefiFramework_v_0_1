// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "../../libraries/Errors.sol";
abstract contract PositionManagerStorage {
    bool public opened;
    bool public shouldValidateIncreaseOrder = true;
    address public orderBook;
    mapping (address => bool) public isOrderKeeper; /* address => bool*/
    mapping (address => bool) public isPartner; /* address => bool*/
    mapping (address => bool) public isLiquidator; /* address => bool*/
    modifier onlyOrderKeeper() {
        require(isOrderKeeper[msg.sender], Errors.POSITIONMANAGER_FORBIDDEN);
        _;
    }
    modifier onlyPartnersOrOpened() {
        require(isPartner[msg.sender] || opened, Errors.POSITIONMANAGER_FORBIDDEN);
        _;
    }
    modifier onlyLiquidator() {
        require(isLiquidator[msg.sender], Errors.POSITIONMANAGER_FORBIDDEN);
        _;
    }
}
