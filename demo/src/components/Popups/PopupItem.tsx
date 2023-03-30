/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-12 17:38:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/Popups/PopupItem.tsx
 */
import React, { useCallback, useContext, useEffect } from 'react';
import { X } from 'react-feather';
import { useSpring, animated } from 'react-spring';
import styled, { ThemeContext } from 'styled-components';
import { PopupContent } from '../../state/application/actions';
import { useRemovePopup } from '../../state/application/hooks';
import TransactionPopup from './TransactionPopup';
import ErrorPopup from './ErrorPopup';

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
    min-width: 290px;
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

const AnimatedFader = animated(Fader);

export default function PopupItem({
  removeAfterMs,
  content,
  popKey,
}: {
  removeAfterMs: number | null;
  content: PopupContent;
  popKey: string;
}) {
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);
  useEffect(() => {
    if (removeAfterMs === null) return undefined;

    const timeout = setTimeout(() => {
      removeThisPopup();
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeAfterMs, removeThisPopup]);

  const theme = useContext(ThemeContext);

  let popupContent;
  if ('txn' in content) {
    const {
      txn: { hash, success, summary },
    } = content;
    popupContent = <TransactionPopup hash={hash} success={success} summary={summary} />;
  }
  if ('error' in content) {
    const {
      error: { message, stack },
    } = content;
    popupContent = <ErrorPopup message={message} stack={stack} />;
  }

  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: removeAfterMs ?? undefined },
  });

  return (
    <Popup>
      <StyledClose color={theme.text2} onClick={removeThisPopup} />
      {popupContent}
      {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
    </Popup>
  );
}
