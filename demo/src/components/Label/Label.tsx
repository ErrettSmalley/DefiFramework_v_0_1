/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-23 11:59:04
 * @LastEditors: Errett Smalley
 * @Description:
 * @FilePath: /front-end_code/src/components/Label/Label.tsx
 */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

interface LabelProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'normal';
  color?: string;
  fontSize?: string;
}

const Label: React.FC<LabelProps> = ({ text, variant = 'secondary', color: customColor, fontSize = '20' }) => {
  const { color } = useContext(ThemeContext);

  let labelColor: string;
  if (customColor) {
    labelColor = customColor;
  } else if (variant === 'primary') {
    labelColor = color.primary.main;
  } else if (variant === 'secondary') {
    labelColor = color.secondary.main;
  } else if (variant === 'normal') {
    labelColor = color.grey[700];
  }
  return (
    <StyledLabel color={labelColor} fontSize={fontSize}>
      {text}
    </StyledLabel>
  );
};

interface StyledLabelProps {
  color: string;
  fontSize?: string;
}

const StyledLabel = styled.div<StyledLabelProps>`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1rem;
    color: #fff;
  }
`;

export default Label;
