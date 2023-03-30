/*
 * @Author: your name
 * @Date: 2021-03-11 16:14:41
 * @LastEditTime: 2021-12-24 11:32:01
 * @LastEditors: Please set LastEditors
 * @FilePath: /front-end_code/src/views/Bank/components/Timelock.tsx
 */
import React from 'react';
import styled from 'styled-components';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface ProgressCountdownProps {
  deadline: Date;
  description: string;
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({ deadline, description }) => {
  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const d = String(days);
    const h = String(hours);
    const m = String(minutes);
    const s = String(seconds);
    return (
      <StyledCountdown>
        {d.padStart(2, '0')}:{h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
      </StyledCountdown>
    );
  };
  return (
    <StyledCardContentInner>
      <StyledDesc>{description}</StyledDesc>
      <Countdown date={deadline} renderer={countdownRenderer} />
    </StyledCardContentInner>
  );
};

const StyledCountdown = styled.span`
  color: #fcbf3a;
  font-size: 16px;
  font-weight: 700;
  margin: 0 15px;
  @media (max-width: 768px) {
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }
`;

const StyledDesc = styled.span`
  color: #fcbf3a;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1rem;
    font-weight: normal;
    margin-right: 0.5rem;
  }
`;

const StyledCardContentInner = styled.div`
  display: inline-block;
`;

export default ProgressCountdown;
