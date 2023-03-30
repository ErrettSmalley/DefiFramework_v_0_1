/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2023-02-10 17:38:09
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Popups/TransactionPopup.tsx
 */
import React, { useContext } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';
import { useWallet } from 'use-wallet';
import config from '../../config';

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`;

export default function TransactionPopup({
  hash,
  success,
  summary,
}: {
  hash: string;
  success?: boolean;
  summary?: string;
}) {
  const { chainId } = useWallet();
  const theme = useContext(ThemeContext);

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? <CheckCircle color="green" size={24} /> : <AlertCircle color="#FF6871" size={24} />}
      </div>
      <AutoColumn gap="8px">
        <StyledPopupDesc>{summary ?? `Hash: ${hash.slice(0, 8)}...${hash.slice(58, 65)}`}</StyledPopupDesc>
        {chainId && (
          <StyledLink href={`${config.etherscanUrl}/tx/${hash}`} target="_blank">
            View on Blockchain Browser
          </StyledLink>
        )}
      </AutoColumn>
    </RowNoFlex>
  );
}

const StyledPopupDesc = styled.span`
  font-weight: 500;
  color: #fff;
`;

const StyledLink = styled.a`
  color: #fff;
`;
