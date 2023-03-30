/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2023-01-17 15:44:19
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/TopBar/components/AccountButton.tsx
 */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';

import useModal from '../../../hooks/useModal';
import { useWeb3 } from '../../../hooks/useWeb3Context';
import Button from '../../Button';
import AccountModal from './AccountModal';

interface AccountButtonProps { }

const AccountButton: React.FC<AccountButtonProps> = () => {
  const { account } = useWallet();
  const { connect } = useWeb3();

  const [onPresentAccountModal, onDismissTransactionModal] = useModal(
    <AccountModal onDismiss={() => onDismissTransactionModal()} />,
  );

  const handleClick = useCallback(
    (event: any, chainName: string, chainId: string, id: string) => {
      if (chainId !== '80001') {
        toggleNet(chainName, chainId, id, event.target.innerText);
      }
    },
    [],
  );
  const ethereum = window?.ethereum;

  const toggleNet = (chainName: any, chainId: string, id: string, name: string) => {
    ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            // chainId: '0x' + NetworkId[chainName],
            chainId,
          },
        ],
      })
      .then(() => {
        localStorage.setItem('chainId', id);
        connect();
        console.log('The network switch was successful');
      })
      .catch(async (switchError: any) => {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId,
                  chainName,
                  rpcUrls: 'https://rpc-mumbai.maticvigil.com/',
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
      });
  };
  return (
    <StyledAccountButton>
      {!account ? (
        <Button onClick={(e: any) => handleClick(e, 'MUMBAI', '0x13881', '80001')} size="sm" text="Connect Wallet" />
      ) : (
        <Button onClick={onPresentAccountModal} size="sm" text="My Wallet" />
      )}
    </StyledAccountButton>
  );
};

const StyledAccountButton = styled.div`
  button {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    button {
      font-size: 0.6rem;
      margin-right: 1rem;
    }
  }
`;

export default AccountButton;
