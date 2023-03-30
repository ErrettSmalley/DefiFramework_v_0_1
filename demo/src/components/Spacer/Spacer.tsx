/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-22 11:05:09
 * @LastEditors: Errett Smalley
 * @Description:
 * @FilePath: /front-end_code/src/components/Spacer/Spacer.tsx
 */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg';
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
  const { spacing } = useContext(ThemeContext);

  let s: number;
  switch (size) {
    case 'lg':
      s = spacing[6];
      break;
    case 'sm':
      s = spacing[2];
      break;
    case 'md':
    default:
      s = spacing[4];
  }

  return <StyledSpacer size={s} />;
};

interface StyledSpacerProps {
  size: number;
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Spacer;
