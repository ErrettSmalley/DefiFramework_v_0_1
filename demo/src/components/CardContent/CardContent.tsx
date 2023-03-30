/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-22 14:58:28
 * @LastEditors: Errett Smalley
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/CardContent/CardContent.tsx
 */
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const CardContent: React.FC<{children: ReactNode}> = ({ children }) => <StyledCardContent>{children}</StyledCardContent>;

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 14px 0 0;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export default CardContent;
