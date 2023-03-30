/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-17 10:36:29
 * @LastEditors: Errett Smalley
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/utils/formatBalance.ts
 */
import { BigNumber } from 'ethers';

export const getDisplayBalance = (balance: BigNumber, decimals = 18, fractionDigits = 8) => {
  const number = getBalance(balance, decimals - fractionDigits);
  return (number / 10 ** fractionDigits).toFixed(fractionDigits);
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return getDisplayBalance(balance, decimals);
};

export function getBalance(balance: BigNumber, decimals = 18): number {
  return balance.div(BigNumber.from(10).pow(decimals)).toNumber();
}

export function toThousands(num: string) {
  const result = num.replace(/\d+/, (n: string) => {
    return n.replace(/(\d)(?=(\d{3})+$)/g, ($1: string) => {
      return `${$1},`;
    });
  });
  return result;
}
