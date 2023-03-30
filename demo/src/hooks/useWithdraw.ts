/*
 * @Author: your name
 * @Date: 2021-01-08 12:50:13
 * @LastEditTime: 2022-12-13 16:04:50
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/hooks/useStake.ts
 */
import { useCallback } from 'react';
import useCeresCash from './useCeresCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdraw = () => {
  const ceresCash = useCeresCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: number) => {
      handleTransactionReceipt(ceresCash.withdraw(amount), `Withdraw ${amount}`);
    },
    [ceresCash, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
