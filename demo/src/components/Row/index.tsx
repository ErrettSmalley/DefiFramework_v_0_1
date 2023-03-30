/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-10-15 15:24:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Row/index.tsx
 */
import React from 'react';
import styled from 'styled-components';

const Row: React.FC<{children: React.ReactNode}> = ({ children }) => <StyledRow>{children}</StyledRow>;

export const RowBetween = styled(Row)`
  justify-content: space-between;
`;

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`;

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  color: #404040;
  & * {
    margin: 0;
  }
  & button {
    color: #ffffff;
    background: #ff9200;
    border-radius: 10px;
    font-size: 16px;
    padding: 5px 0px;
  }
`;
export default Row;
