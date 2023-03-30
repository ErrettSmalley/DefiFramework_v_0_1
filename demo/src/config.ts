/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2022-12-13 15:25:07
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/config.ts
 */
import { ChainId } from '@uniswap/sdk';
import { Configuration } from './cash/config';
import deploy from './cash/deployments/network.json';
import deployJson from '../../deployments/localhost/CopilotA.json';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 80001,
    etherscanUrl: deploy.MUMBAI.etherscanUrl,
    defaultProvider: deploy.MUMBAI.defaultProvider,
    deployments: deployJson,
    externalTokens: {
      Test: [deployJson.address, deploy.MUMBAI.decimals],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bankLaunchesAt: new Date('2021-03-22T04:00:00Z'),
    bondLaunchesAt: new Date('2021-03-27T04:00:00Z'),
    boardroomLaunchesAt: new Date('2020-03-27T04:00:00Z'),
    refreshInterval: 20000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: 80001,
    etherscanUrl: deploy.MUMBAI.etherscanUrl,
    defaultProvider: deploy.MUMBAI.defaultProvider,
    deployments: deployJson,
    externalTokens: {
      Test: [deployJson.address, deploy.MUMBAI.decimals],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bankLaunchesAt: new Date('2021-03-22T04:00:00Z'),
    bondLaunchesAt: new Date('2021-03-27T04:00:00Z'),
    boardroomLaunchesAt: new Date('2021-03-27T04:00:00Z'),
    refreshInterval: 20000,
    gasLimitMultiplier: 1.1,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
export { deployJson };
