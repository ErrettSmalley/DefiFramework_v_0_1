/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2023-02-10 17:20:29
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/TopBar/TopBar.tsx
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useWeb3 } from '../../hooks/useWeb3Context';

import Container from '../Container';
import Logo from '../Logo';

import AccountButton from './components/AccountButton';
import TxButton from './components/TxButton';

const TopBar: React.FC = () => {

  const [show, setShow] = useState<boolean>(false);


  return (
    <StyledTopBar show={show}>
      <Container>
        <StyledTopBarInner>
          <StyledRight>
            <TxButton />
            <AccountButton />
          </StyledRight>
          <StyledMobileRight>
            <TxButton />
            <AccountButton />
          </StyledMobileRight>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  );
};

interface StyledTopBarProps {
  show?: boolean;
}

const StyledTopBar = styled.div<StyledTopBarProps>`
  padding-top: 30px;
  @media (max-width: 768px) {
    padding-top: 1rem;
    & > div {
      padding: 0 1rem;
    }
  } ;
`;

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  flex-wrap: wrap;
  .icon {
    display: none;
  }
  @media (max-width: 768px) {
    height: auto;
    .icon {
      display: block;
      position: absolute;
      z-index: 111;
      top: 4rem;
      right: 2rem;
      color: #fff;
    }
  }
`;

const StyledLogoBox = styled.div`
  & i {
    display: none;
    color: #ffffff;
  }
  & .icon-guanbi {
    color: #000;
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & i {
      display: block;
    }
  } ;
`;

const StyledRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    display: none;
  } ;
`;

const StyledMobileRight = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    button {
      padding: 0.2rem 0.5rem;
    }
  } ;
`;

const StyledMobileNav = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export default TopBar;
