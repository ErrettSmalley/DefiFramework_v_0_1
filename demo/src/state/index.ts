import { configureStore } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import transactionsReducer from './transactions/reducer';
import application from './application/reducer';
import messagesReducer from './messages/MessagesSlice';

const PERSISTED_KEYS: string[] = ['transactions'];

const transactions = persistReducer(
  {
    key: 'transactions',
    storage,
  },
  transactionsReducer,
);

const store = configureStore({
  reducer: {
    application,
    transactions,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  preloadedState: load({ states: PERSISTED_KEYS }),
});
// const store = configureStore({
//   reducer: {
//     application,
//     transactions,
//     messages: messagesReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
//   // middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],
//   preloadedState: load({ states: PERSISTED_KEYS }),
// });

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
