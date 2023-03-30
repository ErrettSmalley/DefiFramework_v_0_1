/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2022-12-13 15:49:14
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Input/Input.tsx
 */
import React from 'react';
import styled from 'styled-components';

export interface InputProps {
  endAdornment?: React.ReactNode;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  value: string;
  color?: string;
  maxAdornment?: React.ReactNode;
  readonly?: boolean;
}

const Input: React.FC<InputProps> = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
  color,
  maxAdornment,
  readonly,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledBox>
        <StyledInput readOnly={readonly} color={color} placeholder={placeholder} value={value} onChange={onChange} />
        {!!maxAdornment && maxAdornment}
      </StyledBox>
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  width: auto;
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #000;
  border-radius: ${(props) => props.theme.borderRadius}px;
  & button {
    height: 28px;
    width: 50px;
    padding: 0;
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    border-radius: 5px;
  }
`;

const StyledInput = styled.input<InputProps>`
  width: 100%;
  background: none;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius}px;
  font-size: 20px;
  color: #000;
  flex: 1;
  margin: 0;
  padding: 5px 10px;
  outline: none;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    padding: 0 0.5rem;
    border-radius: 5px;
    box-shadow: 0px 1px 2px 0px rgba(179, 167, 167, 0.45);
  }
`;

export default Input;
