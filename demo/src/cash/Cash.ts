import { Configuration } from './config';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDefaultProvider } from '../utils/provider';

/**
 * An API module of contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export default class CeresCash {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  boardroomVersionOfUser?: string;

  provider_web3: any;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();
    // loads contracts from deployments
    this.contracts = {};
    // for (const [name, deployment] of Object.entries(deployments)) {
    //   this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    // }
    this.contracts['CopilotA'] = new Contract(deployments.address, deployments.abi, provider);
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal); // TODO: add decimal
    }
    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);
    this.signer = newProvider.getSigner(0);

    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    this.boardroomVersionOfUser = 'latest';
    this.provider_web3 = provider;
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  /**
   * @description:
   * @param {*} index
   * @return {*}
   */
  async deposit(amount: number): Promise<TransactionResponse> {
    const { CopilotA } = this.contracts;
    return await CopilotA.deposit(amount);
  }

  /**
   * @description:
   * @param {*} index
   * @return {*}
   */
  async withdraw(amount: number): Promise<TransactionResponse> {
    const { CopilotA } = this.contracts;
    return await CopilotA.withdraw(amount);
  }
}
