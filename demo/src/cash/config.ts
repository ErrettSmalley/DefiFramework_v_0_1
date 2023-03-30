import { Deployments } from './deployments';
import { ChainId } from '@uniswap/sdk';

export interface Configuration {
  chainId: ChainId | number;
  etherscanUrl: string;
  defaultProvider: string;
  deployments: Deployments | any;
  externalTokens: {[contractName: string]: [string, number]};
  config?: EthereumConfig;

  baseLaunchDate: Date;
  bankLaunchesAt: Date;
  bondLaunchesAt: Date;
  boardroomLaunchesAt: Date;

  refreshInterval: number;
  gasLimitMultiplier: number;
}

export interface EthereumConfig {
  testing: boolean;
  autoGasMultiplier: number;
  defaultConfirmations: number;
  defaultGas: string;
  defaultGasPrice: string;
  ethereumNodeTimeout: number;
}

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
};
