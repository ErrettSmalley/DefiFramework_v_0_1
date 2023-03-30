/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-12 17:35:56
 * @LastEditors: Please set LastEditors
 * @FilePath: /front-end_code/src/components/ModalTitle/ModalTitle.tsx
 */
import React from 'react';
import styled from 'styled-components';

interface ModalTitleProps {
  text?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => <StyledModalTitle>{text}</StyledModalTitle>;

const StyledModalTitle = styled.div`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  padding: 30px;
  @media (max-width: 768px) {
    text-align: center;
    padding: 1rem;
    color: #fff;
  } ;
`;

export default ModalTitle;
