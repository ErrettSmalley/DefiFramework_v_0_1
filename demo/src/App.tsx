/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2023-02-10 17:38:04
 * @LastEditors: Errett Smalley ErrettSmalley@protonmail.com
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/App.tsx
 */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import styled, { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import { install } from 'resize-observer';

import CashProvider from './contexts/CashProvider';
import ModalsProvider from './contexts/Modals';

import store from './state';
import theme from './theme';
import Updaters from './state/Updaters';
import Popups from './components/Popups';
import Messages from './components/Message';

const Claim = lazy(() => import('./views/Claim'));

const persistor = persistStore(store);

const App: React.FC = () => {
  if (typeof window !== 'undefined') {
    install();
  }
  install();
  return (
    <StyledBg>
      <Providers>
        <Router>
          <Suspense>
            <Routes>
              <Route path="/" element={<Claim />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </Router>
      </Providers>
    </StyledBg>
  );
};

const PersistGateProxy: any = PersistGate;
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider>
        <Provider store={store}>
          <PersistGateProxy loading={null} persistor={persistor}>
            <Updaters />
            <CashProvider>
              <ModalsProvider>
                <>
                  <Popups />
                  <Messages />
                  {children}
                </>
              </ModalsProvider>
            </CashProvider>
          </PersistGateProxy>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

const StyledBg = styled.div`
  max-width: ${theme.siteWidth}px;
  margin: 0 auto;
  @media (max-width: 768px) {
  }
`;
export default App;
