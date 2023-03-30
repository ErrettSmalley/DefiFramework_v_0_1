/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-10-14 14:17:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/ModalActions/ModalActions.tsx
 */
import React from 'react';
import styled from 'styled-components';

const ModalActions: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const l = React.Children.toArray(children).length;
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
          {i < l - 1 && <StyledSpacer />}
        </>
      ))}
    </StyledModalActions>
  );
};

const StyledModalActions = styled.div`
  padding: 10px 0 20px 0;
  background: #2d1b06;
  border-radius: 0 0 10px 10px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const StyledModalAction = styled.div`
  flex: 1;
`;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[4]}px;
`;

export default ModalActions;
