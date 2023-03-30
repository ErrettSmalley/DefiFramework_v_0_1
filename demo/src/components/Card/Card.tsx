/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-23 10:51:47
 * @LastEditors: Errett Smalley
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Card/Card.tsx
 */
import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children?: React.ReactNode;
  bgColor?: string;
}

const Card: React.FC<CardProps> = ({ children, bgColor }) => <StyledCard bgColor={bgColor}>{children}</StyledCard>;

const StyledCard = styled.div<CardProps>`
  background: ${(props) => props.bgColor};
  border-radius: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    border: none;
    margin: 1rem;
  }
`;

export default Card;
