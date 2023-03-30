/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-09-13 11:47:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Container/Container.tsx
 */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
interface ContainerProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({ children, size = 'lg' }) => {
  const { siteWidth } = useContext<{ siteWidth: number }>(ThemeContext);
  let width: number;
  switch (size) {
    case 'sm':
      width = siteWidth / 2;
      break;
    case 'md':
      width = (siteWidth * 2) / 3;
      break;
    case 'lg':
    default:
      width = siteWidth;
  }
  return <StyledContainer width={width}>{children}</StyledContainer>;
};

interface StyledContainerProps {
  width: number;
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${(props) => props.width}px;
  width: 100%;
`;

export default Container;
