/*
 * @Author: your name
 * @Date: 2021-11-29 17:56:47
 * @LastEditTime: 2022-12-13 17:03:29
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @FilePath: /Capricorn_front_end/src/views/Faucet/index.tsx
 */
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import useDeposit from '../../hooks/useDeposit';
import useWithdraw from '../../hooks/useWithdraw';

import Page from '../../components/Page';
import Button from './Button';
import Input from '../../components/Input';

const Faucet: React.FC = () => {
  const [amount1, setAmount1] = useState<string>();

  const handleDespoit = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setAmount1(e.currentTarget.value);
    },
    [setAmount1],
  );

  const [amount2, setAmount2] = useState<string>();

  const handleWithdraw = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setAmount2(e.currentTarget.value);
    },
    [setAmount2],
  );

  const { onDeposit } = useDeposit();
  const { onWithdraw } = useWithdraw();

  return (
    <Page>
      <StyledWrap>
        <StyledBox>
          <Input onChange={handleDespoit} value={amount1 || ''} />
          <Button onClick={() => onDeposit(parseFloat(amount1))} text="deposit" />
        </StyledBox>

        <StyledBox>
          <Input onChange={handleWithdraw} value={amount2 || ''} />
          <Button onClick={() => onWithdraw(parseFloat(amount2))} text="withdraw" />
        </StyledBox>
      </StyledWrap>
    </Page>
  );
};

const StyledWrap = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 40px 0;
  text-align: center;
  @media (max-width: 768px) {
    padding: 3rem 0;
    margin-bottom: 1rem;
  }
`;

const StyledBox = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 0 10px;

  button {
    width: 100%;
    padding: 10px 0;
    margin-top: 10px;
  }
  @media (max-width: 768px) {
    width: 90%;
    height: 4rem;
    margin: 0 auto;
    padding: 0 1rem;
    button {
      height: 1.6rem;
      margin-top: 1rem;
    }
  }
`;

export default Faucet;
