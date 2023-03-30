export interface Deployments {
  [contractName: string]: {
    address: string;
    abi: any[];
  };
}
