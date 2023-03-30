/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-12-10 12:12:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Logo/Logo.tsx
 */
import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/img/logo.png';
interface LogoProps {
  show?: boolean;
}

const Logo: React.FC<LogoProps> = ({ show }) => {
  return (
    <StyledLogo>
      <StyledLink href="/">
        <img className="logo" src={logo} />
      </StyledLink>
      {/* <StyledLink href="/">Ceres</StyledLink> */}
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  .logo {
    width: 200px;
    height: 56px;
  }
  @media (max-width: 768px) {
    .logo {
      width: auto;
      height: 2rem;
    }
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export default Logo;
