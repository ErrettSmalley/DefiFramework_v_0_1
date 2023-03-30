/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-17 14:34:34
 * @LastEditors: Errett Smalley
 * @Description:
 * @FilePath: /front-end_code/src/state/transactions/actions.ts
 */
import { createAction } from '@reduxjs/toolkit';
import { ChainId } from '@uniswap/sdk';

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

export const addTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  from: string;
  approval?: { tokenAddress: string; spender: string };
  summary?: string;
}>('transactions/addTransaction');

export const clearAllTransactions = createAction<{ chainId: ChainId }>('transactions/clearAllTransactions');

export const finalizeTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>('transactions/finalizeTransaction');

export const checkedTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  blockNumber: number;
}>('transactions/checkedTransaction');
