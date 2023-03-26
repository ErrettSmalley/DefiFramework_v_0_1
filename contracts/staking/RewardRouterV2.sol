// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../core/settings/RewardRouterV2Settings.sol";

contract RewardRouterV2 is RewardRouterV2Settings {
    
    receive() external payable {
        require(msg.sender == weth, Errors.ROUTER_INVALID_SENDER);
    }

    function mintAndStakeMlp(address _token, uint256 _amount, uint256 _minUsdm, uint256 _minMlp) external nonReentrant returns (uint256) {
        require(_amount > 0, Errors.REWARDROUTER_INVALID_AMOUNT);
        address account = msg.sender;
        uint256 mlpAmount = IMlpManager(mlpManager).addLiquidityForAccount(account, account, _token, _amount, _minUsdm, _minMlp);
        return mlpAmount;
    }

    function mintAndStakeMlpETH(uint256 _minUsdm, uint256 _minMlp) external payable nonReentrant returns (uint256) {
        require(msg.value > 0, Errors.REWARDROUTER_INVALID_MSG_VALUE);
        IWETH(weth).deposit{value : msg.value}();
        IERC20(weth).approve(mlpManager, msg.value);
        address account = msg.sender;
        uint256 mlpAmount = IMlpManager(mlpManager).addLiquidityForAccount(address(this), account, weth, msg.value, _minUsdm, _minMlp);
        return mlpAmount;
    }

    function unstakeAndRedeemMlp(address _tokenOut, uint256 _mlpAmount, uint256 _minOut, address _receiver) external nonReentrant returns (uint256) {
        require(_mlpAmount > 0, Errors.REWARDROUTER_INVALID_MLPAMOUNT);
        address account = msg.sender;
//        IRewardTracker(stakedMlpTracker).unstakeForAccount(account, feeMlpTracker, _mlpAmount, account);
//        IRewardTracker(feeMlpTracker).unstakeForAccount(account, mlp, _mlpAmount, account);
        uint256 amountOut = IMlpManager(mlpManager).removeLiquidityForAccount(account, _tokenOut, _mlpAmount, _minOut, _receiver);
        emit Events.UnstakeMlp(account, _mlpAmount);
        return amountOut;
    }

    function unstakeAndRedeemMlpETH(uint256 _mlpAmount, uint256 _minOut, address payable _receiver) external nonReentrant returns (uint256) {
        require(_mlpAmount > 0, Errors.REWARDROUTER_INVALID_MLPAMOUNT);
        address account = msg.sender;
//        IRewardTracker(stakedMlpTracker).unstakeForAccount(account, feeMlpTracker, _mlpAmount, account);
//        IRewardTracker(feeMlpTracker).unstakeForAccount(account, mlp, _mlpAmount, account);
        uint256 amountOut = IMlpManager(mlpManager).removeLiquidityForAccount(account, weth, _mlpAmount, _minOut, address(this));
        IWETH(weth).withdraw(amountOut);
        _receiver.sendValue(amountOut);
        emit Events.UnstakeMlp(account, _mlpAmount);
        return amountOut;
    }
}
