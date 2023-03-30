import React, { useMemo } from 'react';
import Modal, { ModalProps } from '../../Modal';
import Label from '../../Label';
import Button from '../../Button';
import { TransactionDetails } from '../../../state/transactions/reducer';
import styled from 'styled-components';
import Transaction from './Transaction';
import Spacer from '../../Spacer';
import { isTransactionRecent, useAllTransactions, useClearAllTransactions } from '../../../state/transactions/hooks';
import { Trash } from 'react-feather';

const MAX_TRANSACTION_HISTORY = 10;

const TxModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const allTransactions = useAllTransactions();
  const { clearAllTransactions } = useClearAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);
  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt);
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).slice(0, MAX_TRANSACTION_HISTORY);

  const isEmpty = confirmed?.length + pending?.length === 0;
  return (
    <Modal bgColor="#323A45" size="md">
      <StyledBox>
        <StyledTitleArea>
          <StyledModalTitle>Transactions</StyledModalTitle>
          {confirmed?.length > 0 && (
            <StyledClearIconWrapper>
              <Trash onClick={clearAllTransactions} size="16" />
            </StyledClearIconWrapper>
          )}
        </StyledTitleArea>
        {pending?.length > 0 && (
          <>
            <Label color="#fff" text="Pending transactions" />
            <StyledTransactionList>
              {pending.map((tx) => (
                <Transaction key={tx.hash} tx={tx} />
              ))}
            </StyledTransactionList>
            <Spacer size="sm" />
          </>
        )}
        {confirmed?.length > 0 && (
          <>
            <Label color="#fff" text="Recent transactions" />
            <StyledTransactionList>
              {confirmed.map((tx) => (
                <Transaction key={tx.hash} tx={tx} />
              ))}
            </StyledTransactionList>
          </>
        )}
        {isEmpty && <Label text="No transactions." color="#eee" />}

        <Button text="Close" onClick={onDismiss} />
      </StyledBox>
    </Modal>
  );
};

const StyledBox = styled.div`
  padding: 20px;
  button {
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    padding: 1rem;
    button {
      margin-top: 1.4rem;
    }
  }
`;

const StyledTitleArea = styled.div`
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.topBarSize}px;
  margin-top: ${(props) => -props.theme.spacing[4]}px;
  @media (max-width: 768px) {
    height: auto;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const StyledModalTitle = styled.div`
  color: #fff;
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StyledClearIconWrapper = styled.div`
  color: #fff;
  cursor: pointer;
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

export default TxModal;
