// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "../storage/RewardRouterV2Storage.sol";
abstract contract RewardRouterV2Settings is RewardRouterV2Storage {
    function initialize(address _weth, address _mold, address _esMold, address _bnMold, address _mlp, address _stakedMoldTracker, address _bonusMoldTracker, address _feeMoldTracker, address _feeMlpTracker, address _stakedMlpTracker, address _mlpManager, address _moldVester, address _mlpVester) external onlyGov {
        require(!isInitialized, Errors.REWARDROUTER_ALREADY_INITIALIZED);
        isInitialized = true;
        weth = _weth;
        mold = _mold;
        esMold = _esMold;
        bnMold = _bnMold;
        mlp = _mlp;
        stakedMoldTracker = _stakedMoldTracker;
        bonusMoldTracker = _bonusMoldTracker;
        feeMoldTracker = _feeMoldTracker;
        feeMlpTracker = _feeMlpTracker;
        stakedMlpTracker = _stakedMlpTracker;
        mlpManager = _mlpManager;
        moldVester = _moldVester;
        mlpVester = _mlpVester;
    }
//    function withdrawToken(address _token, address _account, uint256 _amount) external onlyGov {
//        IERC20(_token).safeTransfer(_account, _amount);
//    }
//    function batchStakeMoldForAccount(address[] memory _accounts, uint256[] memory _amounts) external nonReentrant onlyGov {
//        address _mold = mold;
//        for (uint256 i = 0; i < _accounts.length; i++) {
//            _stakeMold(msg.sender, _accounts[i], _mold, _amounts[i]);
//        }
//    }
//    function stakeMoldForAccount(address _account, uint256 _amount) external nonReentrant onlyGov {
//        _stakeMold(msg.sender, _account, mold, _amount);
//    }
//    function stakeMold(uint256 _amount) external nonReentrant {
//        _stakeMold(msg.sender, msg.sender, mold, _amount);
//    }
//    function stakeEsMold(uint256 _amount) external nonReentrant {
//        _stakeMold(msg.sender, msg.sender, esMold, _amount);
//    }
//    function unstakeMold(uint256 _amount) external nonReentrant {
//        _unstakeMold(msg.sender, mold, _amount, true);
//    }
//    function unstakeEsMold(uint256 _amount) external nonReentrant {
//        _unstakeMold(msg.sender, esMold, _amount, true);
//    }
//    function claim() external nonReentrant {
//        address account = msg.sender;
//        IRewardTracker(feeMoldTracker).claimForAccount(account, account);
//        IRewardTracker(feeMlpTracker).claimForAccount(account, account);
//        IRewardTracker(stakedMoldTracker).claimForAccount(account, account);
//        IRewardTracker(stakedMlpTracker).claimForAccount(account, account);
//    }
//    function claimEsMold() external nonReentrant {
//        address account = msg.sender;
//        IRewardTracker(stakedMoldTracker).claimForAccount(account, account);
//        IRewardTracker(stakedMlpTracker).claimForAccount(account, account);
//    }
//    function claimFees() external nonReentrant {
//        address account = msg.sender;
//
//        IRewardTracker(feeMoldTracker).claimForAccount(account, account);
//        IRewardTracker(feeMlpTracker).claimForAccount(account, account);
//    }
//    function compound() external nonReentrant {
//        _compound(msg.sender);
//    }
//    function compoundForAccount(address _account) external nonReentrant onlyGov {
//        _compound(_account);
//    }
//    function handleRewards(bool _shouldClaimMold, bool _shouldStakeMold, bool _shouldClaimEsMold, bool _shouldStakeEsMold, bool _shouldStakeMultiplierPoints, bool _shouldClaimWeth, bool _shouldConvertWethToEth) external nonReentrant {
//        address account = msg.sender;
//        uint256 moldAmount = 0;
//        if (_shouldClaimMold) {
//            uint256 moldAmount0 = IVester(moldVester).claimForAccount(account, account);
//            uint256 moldAmount1 = IVester(mlpVester).claimForAccount(account, account);
//            moldAmount = moldAmount0.add(moldAmount1);
//        }
//        if (_shouldStakeMold && moldAmount > 0) {
//            _stakeMold(account, account, mold, moldAmount);
//        }
//        uint256 esMoldAmount = 0;
//        if (_shouldClaimEsMold) {
//            uint256 esMoldAmount0 = IRewardTracker(stakedMoldTracker).claimForAccount(account, account);
//            uint256 esMoldAmount1 = IRewardTracker(stakedMlpTracker).claimForAccount(account, account);
//            esMoldAmount = esMoldAmount0.add(esMoldAmount1);
//        }
//        if (_shouldStakeEsMold && esMoldAmount > 0) {
//            _stakeMold(account, account, esMold, esMoldAmount);
//        }
//        if (_shouldStakeMultiplierPoints) {
//            uint256 bnMoldAmount = IRewardTracker(bonusMoldTracker).claimForAccount(account, account);
//            if (bnMoldAmount > 0) {
//                IRewardTracker(feeMoldTracker).stakeForAccount(account, account, bnMold, bnMoldAmount);
//            }
//        }
//        if (_shouldClaimWeth) {
//            if (_shouldConvertWethToEth) {
//                uint256 weth0 = IRewardTracker(feeMoldTracker).claimForAccount(account, address(this));
//                uint256 weth1 = IRewardTracker(feeMlpTracker).claimForAccount(account, address(this));
//                uint256 wethAmount = weth0.add(weth1);
//                IWETH(weth).withdraw(wethAmount);
//                payable(account).sendValue(wethAmount);
//            } else {
//                IRewardTracker(feeMoldTracker).claimForAccount(account, account);
//                IRewardTracker(feeMlpTracker).claimForAccount(account, account);
//            }
//        }
//    }
//    function batchCompoundForAccounts(address[] memory _accounts) external nonReentrant onlyGov {
//        for (uint256 i = 0; i < _accounts.length; i++) {
//            _compound(_accounts[i]);
//        }
//    }
//    function signalTransfer(address _receiver) external nonReentrant {
//        require(IERC20(moldVester).balanceOf(msg.sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        require(IERC20(mlpVester).balanceOf(msg.sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        _validateReceiver(_receiver);
//        pendingReceivers[msg.sender] = _receiver;
//    }
//    function acceptTransfer(address _sender) external nonReentrant {
//        require(IERC20(moldVester).balanceOf(_sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        require(IERC20(mlpVester).balanceOf(_sender) == 0, Errors.REWARDROUTER_SENDER_HAS_VESTED_TOKENS);
//        address receiver = msg.sender;
//        require(pendingReceivers[_sender] == receiver, Errors.REWARDROUTER_TRANSFER_NOT_SIGNALLED);
//        delete pendingReceivers[_sender];
//        _validateReceiver(receiver);
//        _compound(_sender);
//        uint256 stakedMold = IRewardTracker(stakedMoldTracker).depositBalances(_sender, mold);
//        if (stakedMold > 0) {
//            _unstakeMold(_sender, mold, stakedMold, false);
//            _stakeMold(_sender, receiver, mold, stakedMold);
//        }
//        uint256 stakedEsMold = IRewardTracker(stakedMoldTracker).depositBalances(_sender, esMold);
//        if (stakedEsMold > 0) {
//            _unstakeMold(_sender, esMold, stakedEsMold, false);
//            _stakeMold(_sender, receiver, esMold, stakedEsMold);
//        }
//        uint256 stakedBnMold = IRewardTracker(feeMoldTracker).depositBalances(_sender, bnMold);
//        if (stakedBnMold > 0) {
//            IRewardTracker(feeMoldTracker).unstakeForAccount(_sender, bnMold, stakedBnMold, _sender);
//            IRewardTracker(feeMoldTracker).stakeForAccount(_sender, receiver, bnMold, stakedBnMold);
//        }
//        uint256 esMoldBalance = IERC20(esMold).balanceOf(_sender);
//        if (esMoldBalance > 0) {
//            IERC20(esMold).transferFrom(_sender, receiver, esMoldBalance);
//        }
//        uint256 mlpAmount = IRewardTracker(feeMlpTracker).depositBalances(_sender, mlp);
//        if (mlpAmount > 0) {
//            IRewardTracker(stakedMlpTracker).unstakeForAccount(_sender, feeMlpTracker, mlpAmount, _sender);
//            IRewardTracker(feeMlpTracker).unstakeForAccount(_sender, mlp, mlpAmount, _sender);
//
//            IRewardTracker(feeMlpTracker).stakeForAccount(_sender, receiver, mlp, mlpAmount);
//            IRewardTracker(stakedMlpTracker).stakeForAccount(receiver, receiver, feeMlpTracker, mlpAmount);
//        }
//        IVester(moldVester).transferStakeValues(_sender, receiver);
//        IVester(mlpVester).transferStakeValues(_sender, receiver);
//    }
//    function _validateReceiver(address _receiver) private view {
//        require(IRewardTracker(stakedMoldTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_STAKEDMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(stakedMoldTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_STAKEDMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(bonusMoldTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_BONUSMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(bonusMoldTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_BONUSMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(feeMoldTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_FEEMOLDTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(feeMoldTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_FEEMOLDTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IVester(moldVester).transferredAverageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDAVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IVester(moldVester).transferredCumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDCUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(stakedMlpTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_STAKEDMLPTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(stakedMlpTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_STAKEDMLPTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IRewardTracker(feeMlpTracker).averageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_FEEMLPTRACKER_AVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IRewardTracker(feeMlpTracker).cumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_FEEMLPTRACKER_CUMULATIVEREWARDS_GREATER_0);
//        require(IVester(mlpVester).transferredAverageStakedAmounts(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDAVERAGESTAKEDAMOUNTS_GREATER_0);
//        require(IVester(mlpVester).transferredCumulativeRewards(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_TRANSFERREDCUMULATIVEREWARDS_GREATER_0);
//        require(IERC20(moldVester).balanceOf(_receiver) == 0, Errors.REWARDROUTER_MOLDVESTER_BALANCE_GREATER_0);
//        require(IERC20(mlpVester).balanceOf(_receiver) == 0, Errors.REWARDROUTER_MLPVESTER_BALANCE_GREATER_0);
//    }
//    function _compound(address _account) private {
//        _compoundMold(_account);
//        _compoundMlp(_account);
//    }
//    function _compoundMold(address _account) private {
//        uint256 esMoldAmount = IRewardTracker(stakedMoldTracker).claimForAccount(_account, _account);
//        if (esMoldAmount > 0) {
//            _stakeMold(_account, _account, esMold, esMoldAmount);
//        }
//        uint256 bnMoldAmount = IRewardTracker(bonusMoldTracker).claimForAccount(_account, _account);
//        if (bnMoldAmount > 0) {
//            IRewardTracker(feeMoldTracker).stakeForAccount(_account, _account, bnMold, bnMoldAmount);
//        }
//    }
//    function _compoundMlp(address _account) private {
//        uint256 esMoldAmount = IRewardTracker(stakedMlpTracker).claimForAccount(_account, _account);
//        if (esMoldAmount > 0) {
//            _stakeMold(_account, _account, esMold, esMoldAmount);
//        }
//    }
//    function _stakeMold(address _fundingAccount, address _account, address _token, uint256 _amount) private {
//        require(_amount > 0, Errors.REWARDROUTER_INVALID_AMOUNT);
//        IRewardTracker(stakedMoldTracker).stakeForAccount(_fundingAccount, _account, _token, _amount);
//        IRewardTracker(bonusMoldTracker).stakeForAccount(_account, _account, stakedMoldTracker, _amount);
//        IRewardTracker(feeMoldTracker).stakeForAccount(_account, _account, bonusMoldTracker, _amount);
//        emit Events.StakeMold(_account, _token, _amount);
//    }
//    function _unstakeMold(address _account, address _token, uint256 _amount, bool _shouldReduceBnMold) private {
//        require(_amount > 0, Errors.REWARDROUTER_INVALID_AMOUNT);
//        uint256 balance = IRewardTracker(stakedMoldTracker).stakedAmounts(_account);
//        IRewardTracker(feeMoldTracker).unstakeForAccount(_account, bonusMoldTracker, _amount, _account);
//        IRewardTracker(bonusMoldTracker).unstakeForAccount(_account, stakedMoldTracker, _amount, _account);
//        IRewardTracker(stakedMoldTracker).unstakeForAccount(_account, _token, _amount, _account);
//        if (_shouldReduceBnMold) {
//            uint256 bnMoldAmount = IRewardTracker(bonusMoldTracker).claimForAccount(_account, _account);
//            if (bnMoldAmount > 0) {
//                IRewardTracker(feeMoldTracker).stakeForAccount(_account, _account, bnMold, bnMoldAmount);
//            }
//            uint256 stakedBnMold = IRewardTracker(feeMoldTracker).depositBalances(_account, bnMold);
//            if (stakedBnMold > 0) {
//                uint256 reductionAmount = stakedBnMold.mul(_amount).div(balance);
//                IRewardTracker(feeMoldTracker).unstakeForAccount(_account, bnMold, reductionAmount, _account);
//                IMintable(bnMold).burn(_account, reductionAmount);
//            }
//        }
//        emit Events.UnstakeMold(_account, _token, _amount);
//    }
}
