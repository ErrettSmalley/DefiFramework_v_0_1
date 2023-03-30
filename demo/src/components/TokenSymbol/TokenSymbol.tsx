/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2022-01-05 15:44:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/components/TokenSymbol/TokenSymbol.tsx
 */
import React from 'react';

import BUSD from '../../assets/img/busd.png';
import CRS from '../../assets/img/crs.png';
import ASC from '../../assets/img/asc.png';
import ClaimLogo from '../../assets/img/claimLogo.png';

const logosBySymbol: { [title: string]: string } = {
  BUSD,
  CRS,
  ASC,
  ClaimLogo,
};

interface CeresLogoProps {
  symbol: string;
  width?: string;
  height?: string;
}

const TokenSymbol: React.FC<CeresLogoProps> = ({ symbol, width = 'auto', height = 'auto' }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid CeresLogo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={width} height={height} />;
};

export default TokenSymbol;
