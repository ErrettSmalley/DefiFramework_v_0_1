// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./BasePositionManager.sol";
import "./settings/PositionManagerSettings.sol";

contract PositionManager is BasePositionManager, PositionManagerSettings {

    constructor(address _vault, address _router, address _shortsTracker, address _weth, uint256 _depositFee, address _orderBook) public BasePositionManager(_vault, _router, _shortsTracker, _weth, _depositFee) {
        orderBook = _orderBook;
    }
    
    function increasePosition(address[] memory _path, address _indexToken, uint256 _amountIn, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external nonReentrant onlyPartnersOrOpened {
        require(_path.length == 1 || _path.length == 2, Errors.POSITIONMANAGER_INVALID_PATH_LENGTH);
        if (_amountIn > 0) {
            if (_path.length == 1) {
                IRouter(router).pluginTransfer(_path[0], msg.sender, address(this), _amountIn);
            } else {
                IRouter(router).pluginTransfer(_path[0], msg.sender, vault, _amountIn);
                _amountIn = _swap(_path, _minOut, address(this));
            }
            uint256 afterFeeAmount = _collectFees(msg.sender, _path, _amountIn, _indexToken, _isLong, _sizeDelta);
            IERC20(_path[_path.length - 1]).safeTransfer(vault, afterFeeAmount);
        }
        _increasePosition(msg.sender, _path[_path.length - 1], _indexToken, _sizeDelta, _isLong, _price);
    }

    function increasePositionETH(address[] memory _path, address _indexToken, uint256 _minOut, uint256 _sizeDelta, bool _isLong, uint256 _price) external payable nonReentrant onlyPartnersOrOpened {
        require(_path.length == 1 || _path.length == 2, Errors.POSITIONMANAGER_INVALID_PATH_LENGTH);
        require(_path[0] == weth, Errors.POSITIONMANAGER_INVALID_PATH);
        if (msg.value > 0) {
            _transferInETH();
            uint256 _amountIn = msg.value;
            if (_path.length > 1) {
                IERC20(weth).safeTransfer(vault, msg.value);
                _amountIn = _swap(_path, _minOut, address(this));
            }
            uint256 afterFeeAmount = _collectFees(msg.sender, _path, _amountIn, _indexToken, _isLong, _sizeDelta);
            IERC20(_path[_path.length - 1]).safeTransfer(vault, afterFeeAmount);
        }
        _increasePosition(msg.sender, _path[_path.length - 1], _indexToken, _sizeDelta, _isLong, _price);
    }

    function decreasePosition(address[] memory _path, address _indexToken, uint256 _collateralDelta, uint256 _sizeDelta, bool _isLong, address _receiver, uint256 _price, uint256 _minOut, bool _withdrawETH) external nonReentrant onlyPartnersOrOpened {
        require(_path.length == 1 || _path.length == 2, Errors.POSITIONMANAGER_INVALID_PATH_LENGTH);
        if (_withdrawETH) require(_path[_path.length - 1] == weth, Errors.POSITIONMANAGER_INVALID_PATH);
        uint256 amountOut = _decreasePosition(msg.sender, _path[0], _indexToken, _collateralDelta, _sizeDelta, _isLong, address(this), _price);
        if (amountOut > 0) {
            if (_path.length > 1) {
                IERC20(_path[0]).safeTransfer(vault, amountOut);
                amountOut = _swap(_path, _minOut, address(this));
            }
            if (_withdrawETH) {
                _transferOutETHWithGasLimitIgnoreFail(amountOut, payable(_receiver));
            } else {
                IERC20(_path[_path.length - 1]).safeTransfer(_receiver, amountOut);
            }
        }
    }

    function liquidatePosition(address _account, address _collateralToken, address _indexToken, bool _isLong, address _feeReceiver) external nonReentrant onlyLiquidator {
        address _vault = vault;
        address timelock = IVault(_vault).gov();
        (uint256 size, , , , , , ,) = IVault(vault).getPosition(_account, _collateralToken, _indexToken, _isLong);
        uint256 markPrice = _isLong ? IVault(_vault).getMinPrice(_indexToken) : IVault(_vault).getMaxPrice(_indexToken);
        IShortsTracker(shortsTracker).updateGlobalShortData(_account, _collateralToken, _indexToken, _isLong, size, markPrice, false);
        ITimelock(timelock).enableLeverage(_vault);
        IVault(_vault).liquidatePosition(_account, _collateralToken, _indexToken, _isLong, _feeReceiver);
        ITimelock(timelock).disableLeverage(_vault);
    }
}
