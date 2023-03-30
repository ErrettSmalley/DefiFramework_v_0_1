import React from 'react';
import styled from 'styled-components';

import useCeresCash from '../../../hooks/useCeresCash';

import Modal, { ModalProps } from '../../Modal';
import ModalTitle from '../../ModalTitle';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const ceresCash = useCeresCash();

  const copyText = () => {
    const copyObject = document.getElementById('walletAddr') as HTMLInputElement;
    copyObject.select();
    copyObject.setSelectionRange(0, 9999);
    const copyToast = document.getElementById('copyToast');
    if (document.execCommand('Copy')) {
      document.execCommand('Copy');
      copyToast.style.visibility = 'visible';
    }
    setTimeout(() => {
      copyToast.style.visibility = 'hidden';
    }, 3000);
  };

  return (
    <Modal bgColor="#323A45" size="md">
      <StyledBox>
        <ModalTitle text="My Wallet" />
        <i className="fas fa-times icon" onClick={onDismiss}></i>
        <StyleAddr>
          <input type="text" id="walletAddr" value={ceresCash.myAccount} readOnly />
        </StyleAddr>
        <StyledFlexBox>
          <StyledLink href={`https://mumbai.polygonscan.com/address/${ceresCash.myAccount}`} target="_blank">
            View on MUMBAI
            <i className="fas fa-external-link-alt"></i>
          </StyledLink>
          <StyledCopy onClick={copyText}>
            <p>Copy Address</p>
            <i className="fas fa-copy"></i>
            <StyleToast id="copyToast">Copied</StyleToast>
          </StyledCopy>
        </StyledFlexBox>
      </StyledBox>
    </Modal>
  );
};

const StyledBox = styled.div`
  .icon {
    display: none;
  }
  padding-bottom: 60px;
  @media (max-width: 768px) {
    .icon {
      display: block;
      position: absolute;
      top: 2.5rem;
      right: 2rem;
      color: #fff;
    }
    padding-bottom: 2rem;
  }
`;

const StyleAddr = styled.div`
  position: relative;
  input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    border: 0;
    border: none;
    background: none;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    outline: none;
    color: ${(props) => props.theme.color.primary.main};
    filter: none !important;
    ::selection {
      background: transparent;
    }
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 100px white inset;
    box-shadow: 0 0 0px 100px white inset;
  }
`;

const StyledFlexBox = styled.div`
  display: flex;
  margin-top: 10px;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;
const StyledLink = styled.a`
  font-weight: bold;
  color: ${(props) => props.theme.color.primary.main};
  cursor: pointer;
  margin-left: 210px;
  i {
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 1rem;
  }
`;

const StyledCopy = styled.div`
  position: relative;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary.main};
  cursor: pointer;
  margin-left: 25px;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 1rem;
  }
  p {
    text-decoration: underline;
    float: left;
  }
  & .fa-copy {
    color: ${(props) => props.theme.color.primary.main};
    cursor: pointer;
    margin-left: 10px;
  }
`;

const StyleToast = styled.div`
  visibility: hidden;
  font-size: 12px;
  background: #939393;
  color: #fff;
  padding: 4px;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  margin-left: 10px;
  position: absolute;
  top: 0;
  right: -60px;
  @media (max-width: 768px) {
    right: -2.5rem;
  }
`;
export default AccountModal;
