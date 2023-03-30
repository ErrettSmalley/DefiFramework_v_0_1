import { createContext, useState, useCallback, useContext, useMemo } from 'react';
import { useWallet } from 'use-wallet';
import { StaticJsonRpcProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

interface onChainProvider {
  connect: () => void;
  disconnect: () => void;
  connected: Boolean;
  provider: JsonRpcProvider;
}

export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

export const Web3Context = createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error('useWeb3Context() can only be used inside of <CeresProvider />');
  }
  const { onChainProvider } = web3Context;
  return useMemo(() => {
    return { ...onChainProvider };
  }, [web3Context]);
};
export const useWeb3 = () => {
  const { connect: connecting, reset } = useWallet();
  const [connected, setConnected] = useState(false);
  const [chainID, setChainID] = useState(80001);
  const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider('https://rpc-mumbai.maticvigil.com'));

  const _initListeners = useCallback(
    (rawProvider: any) => {
      if (!rawProvider.on) {
        return;
      }
      rawProvider.on('accountsChanged', async (accounts: string[]) => {
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on('chainChanged', async (chain: number) => {
        _checkNetwork(chain);
        setTimeout(() => window.location.reload(), 1);
      });
    },
    [provider],
  );

  /**
   * throws an error if networkID is not 56 (BSC)
   */
  const _checkNetwork = (otherChainID: number): Boolean => {
    if (chainID !== otherChainID) {
      console.warn('You are switching networks');
      if (otherChainID === 80001) {
        setChainID(otherChainID);
        return true;
      }
      return false;
    }
    return true;
  };

  // connect - only runs for WalletProviders
  const connect = useCallback(async () => {
    // handling Ledger Live;
    if (!window.ethereum) return;
    // const rawProvider = await web3Modal.connect();
    _initListeners(window.ethereum);
    // const connectedProvider = new Web3Provider(rawProvider, 'any');
    const connectedProvider = new Web3Provider(window.ethereum, 'any');
    const chainId = await connectedProvider.getNetwork().then((network: any) => network.chainId);
    const validNetwork = _checkNetwork(chainId);
    if (!validNetwork) {
      // console.error('Wrong network, please switch to Polygon');
      disconnect();
      return;
    } else {
      connecting('injected');
    }
    // Save everything after we've validated the right network.
    // Eventually we'll be fine without doing network validations.
    setProvider(connectedProvider);
    // Keep this at the bottom of the method, to ensure any repaints have the data we need
    setConnected(true);

    return connectedProvider;
  }, [provider, connecting, _initListeners, _checkNetwork]);

  const disconnect = useCallback(async () => {
    console.log('disconnecting');
    // web3Modal.clearCachedProvider();
    reset();
    setConnected(false);

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1);
  }, [provider, reset]);

  const onChainProvider = useMemo(
    () => ({ connect, disconnect, connected, provider }),
    [connect, disconnect, connected, provider],
  );

  return onChainProvider;
};
