/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-18 17:48:13
 * @LastEditors: Errett Smalley
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/views/Bank/components/BankButton.tsx
 */
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
}

const Button: React.FC<ButtonProps> = ({ disabled, onClick, text }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

interface StyledButtonProps {
  disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 177px;
  height: 40px;
  align-items: center;
  background: ${(props) => (!props.disabled ? '#FFBD2C' : '#eee')};
  border: none;
  border-radius: 8px;
  color: #2d1b06;
  cursor: pointer;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  justify-content: space-around;
  outline: none;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  &:hover {
    background: #eb8332;
  }
  &:active {
    background: #eb8332;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    height: auto;
    padding: 0.5rem;
  } ;
`;

export default Button;
