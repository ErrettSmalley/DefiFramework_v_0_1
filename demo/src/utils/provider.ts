/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-05 12:20:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/utils/provider.ts
 */
import { ethers } from 'ethers';
import config from '../config';
import { web3ProviderFrom } from '../cash/ether-utils';

export function getDefaultProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(web3ProviderFrom(config.defaultProvider), config.chainId);
}
