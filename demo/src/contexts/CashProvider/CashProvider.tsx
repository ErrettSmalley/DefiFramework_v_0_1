/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2023-02-10 17:37:57
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @FilePath: /front-end_code/src/contexts/CashProvider/CashProvider.tsx
 */
import React, { createContext, useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';
import CeresCash from '../../cash';
import config from '../../config';

export interface CeresCashContext {
  ceresCash?: CeresCash;
}

export const Context = createContext<CeresCashContext>({ ceresCash: null });

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [ceresCash, setCeresCash] = useState<CeresCash>();

  useEffect(() => {
    if (!ceresCash) {
      const ceres = new CeresCash(config);
      if (account) {
        // wallet was unlocked at initialization
        ceres.unlockWallet(ethereum, account);
      }
      setCeresCash(ceres);
    } else if (account) {
      ceresCash.unlockWallet(ethereum, account);
    }
  }, [ceresCash, account, ethereum]);

  return <Context.Provider value={{ ceresCash }}>{children}</Context.Provider>;
};
