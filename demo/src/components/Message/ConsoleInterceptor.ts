/*
 * @Author: your name
 * @Date: 2021-11-08 15:28:28
 * @LastEditTime: 2022-01-10 11:34:17
 * @LastEditors: Please set LastEditors
 * @FilePath: /front-end_code/src/components/Message/ConsoleInterceptor.ts
 */
import { error } from '../../state/messages/MessagesSlice';
import store from '../../state';

// List of error messages we wish to intercept
const interceptedConsoleMessages = ['Wrong network, please switch to BSC Mainnet'];

// Intercepts an error sent to console and dispatches it to the message framework.
const consoleInterceptor = (message: any) => {
  if (interceptedConsoleMessages.includes(message)) {
    store.dispatch(error(message));
  }
  (console as any)._error_old(message);
};
consoleInterceptor.isInterceptor = true;

// Replaces the console.error function by our interceptor
if ((console as any).error.isInterceptor != true) {
  (console as any)._error_old = console.error;
  console.error = consoleInterceptor;
}
