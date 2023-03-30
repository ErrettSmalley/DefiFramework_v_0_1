/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-10-19 16:28:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/hooks/useHandleTransactionReceipt.ts
 */
import { useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';
import { useTransactionAdder } from '../state/transactions/hooks';
import { useAddPopup } from '../state/application/hooks';

function useHandleTransactionReceipt(): (promise: Promise<TransactionResponse>, summary: string) => void {
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();

  return useCallback(
    (promise: Promise<TransactionResponse>, summary: string) => {
      promise
        .then((tx) => addTransaction(tx, { summary }))
        .catch((err) => {
          if (err.message.includes('User denied')) {
            // User denied transaction signature on MetaMask.
            return;
          }
          const message = `Unable to ${summary[0].toLowerCase()}${summary.slice(1)}`;
          addPopup({ error: { message, stack: err.message || err.stack } });
        });
    },
    [addPopup, addTransaction],
  );
}

export default useHandleTransactionReceipt;
