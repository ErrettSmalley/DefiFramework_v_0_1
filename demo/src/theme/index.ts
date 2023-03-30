/*
 * @Author: your name
 * @Date: 2021-04-29 16:52:29
 * @LastEditTime: 2021-11-11 14:02:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/src/theme/index.ts
 */
import { black, purple, teal, grey, red, white } from './colors';

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    purple,
    primary: {
      light: red[200],
      main: '#FCBF3A',
    },
    secondary: {
      main: teal[200],
    },
    white,
    teal,
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
};

export default theme;
