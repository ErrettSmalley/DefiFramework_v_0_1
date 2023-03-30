/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-22 11:00:50
 * @LastEditors: Errett Smalley
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Footer/Footer.tsx
 */
import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledFooterInner>
      <StyledLink href="https://t.me/Ceresmoney" target="_blank">
        <i className="fab fa-telegram"></i>
      </StyledLink>
      <StyledLink href="https://medium.com/@Ceresmoney" target="_blank">
        <i className="fab fa-medium"></i>
      </StyledLink>
      <StyledLink href="https://twitter.com/Ceresmoney" target="_blank">
        <i className="fab fa-twitter"></i>
      </StyledLink>
      <StyledLink href="https://github.com/Ceres-Coin" target="_blank">
        <i className="fab fa-github"></i>
      </StyledLink>
      <StyledLink href="https://discord.gg/cv8J9rN4rH" target="_blank">
        <i className="fab fa-discord"></i>
      </StyledLink>
    </StyledFooterInner>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
  }
`;
const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 105px;
  max-width: 600px;
  width: 100%;
  @media (max-width: 768px) {
    height: auto;
    justify-content: space-around;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  i {
    font-size: 35px;
    color: #fff;
    :hover {
      color: #ffca57;
    }
  }
  .icon-medium,
  .icon-discord {
    font-size: 30px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    color: #ffffff;
    padding: 0.3rem 0.5rem;
    i {
      font-size: 1.4rem;
    }
  } ;
`;

export default Footer;
