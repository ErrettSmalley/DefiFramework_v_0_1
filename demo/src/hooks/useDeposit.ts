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

const useDeposit = () => {
  const ceresCash = useCeresCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleDeposit = useCallback(
    (amount: number) => {
      handleTransactionReceipt(ceresCash.deposit(amount), `Deposit ${amount}`);
    },
    [ceresCash, handleTransactionReceipt],
  );
  return { onDeposit: handleDeposit };
};

export default useDeposit;
