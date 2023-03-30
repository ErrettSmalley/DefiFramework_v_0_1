import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { X, AlertCircle } from 'react-feather';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';

import './ConsoleInterceptor';

import store from '../../state';
import { close, handle_obsolete } from '../../state/messages/MessagesSlice';

import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';

// A component that displays error messages
const Messages: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  const messages = useSelector((state: any) => state.messages);
  const dispatch = useDispatch();
  // Returns a function that can closes a message
  const handleClose = (message: any) => {
    setIsShow(false);
    return function () {
      dispatch(close(message));
    };
  };

  const removeAfterMs = 15000;
  useEffect(() => {
    if (messages.items.length) setIsShow(true);
    if (removeAfterMs === null) return undefined;

    const timeout = setTimeout(() => {
      setIsShow(false);
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeAfterMs, messages]);
  const theme = useContext(ThemeContext);
  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: 15000 ?? undefined },
  });

  return (
    <div>
      {isShow ? (
        <FixedPopupColumn gap="20px">
          <Popup>
            <StyledClose color={theme.text2} onClick={() => handleClose(messages.items[0])} />
            <RowNoFlex>
              <div style={{ paddingRight: 16 }}>
                <AlertCircle color="#FF6871" size={24} />
              </div>
              <AutoColumn gap="8px">
                <StyledPopupDesc>{messages?.items[0]?.text}</StyledPopupDesc>
              </AutoColumn>
            </RowNoFlex>
            {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
          </Popup>
        </FixedPopupColumn>
      ) : (
        <div></div>
      )}
    </div>
  );
};
// Invoke repetedly obsolete messages deletion (should be in slice file but I cannot find a way to access the store from there)
window.setInterval(() => {
  store.dispatch(handle_obsolete());
}, 15000);

const FixedPopupColumn = styled(AutoColumn)`
  position: fixed;
  top: 64px;
  margin-right: 24px;
  right: 1rem;
  max-width: 260px !important;
  width: 100%;
  z-index: 2;

  @media (max-width: 768px) {
  } ;
`;
export const StyledClose = styled(X)`
  position: absolute;
  right: 10px;
  top: 10px;

  :hover {
    cursor: pointer;
  }
`;
export const Popup = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1em;
  color: #fff;
  background-color: #323a45;
  position: relative;
  border-radius: 10px;
  padding: 20px;
  padding-right: 15px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const Fader = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.color.grey[400]};
`;

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`;
const StyledPopupDesc = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[500]};
`;

const AnimatedFader = animated(Fader);
export default Messages;
