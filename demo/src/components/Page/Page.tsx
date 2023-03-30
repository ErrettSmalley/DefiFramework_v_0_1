/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2022-12-13 15:28:01
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Page/Page.tsx
 */
import React from 'react';
import styled from 'styled-components';

import TopBar from '../TopBar';
import Footer from '../Footer';

const Page: React.FC<{children: React.ReactNode }> = ({ children }) => (
  <StyledPage>
    <TopBar />
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
);

const StyledPage = styled.div``;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin: 1rem 0.8rem 0;
  }
`;

export default Page;
