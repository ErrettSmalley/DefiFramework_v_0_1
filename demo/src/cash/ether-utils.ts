/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-05 12:19:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/cash/ether-utils.ts
 */
import Web3 from 'web3';
import { defaultEthereumConfig, EthereumConfig } from './config';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

export function web3ProviderFrom(endpoint: string, config?: EthereumConfig): any {
  const ethConfig = Object.assign(defaultEthereumConfig, config || {});
  const ProviderClass = endpoint.includes('wss') ? Web3.providers.WebsocketProvider : Web3.providers.HttpProvider;

  return new ProviderClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  });
}

export function balanceToDecimal(s: string): string {
  return formatUnits(s);
}

export function decimalToBalance(d: string | number, decimals = 18): BigNumber {
  return parseUnits(String(d), decimals);
}
