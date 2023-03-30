/*
 * @Author: your name
 * @Date: 2021-09-01 14:41:59
 * @LastEditTime: 2021-11-05 14:46:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end_code/.eslintrc.js
 */
const { getESLintConfig } = require('@iceworks/spec');

// https://www.npmjs.com/package/@iceworks/spec
module.exports = getESLintConfig('react-ts', {
  // custom config it will merge into main config
  rules: {
    // ...
    'no-console': 'off',
    'no-irregular-whitespace': 'off',
    '@iceworks/best-practices/no-secret-info': 'off',
    'no-nested-ternary': 0,
    'no-lonely-if': 0,
    'no-mixed-operators': 0,
    'no-shadow': 'off',
    'react/jsx-closing-tag-location': 'off',
    'max-len': ['error', { code: 200 }],
    'function-paren-newline': ['off'],
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/no-invalid-void-type': ['off'],
    'import/no-cycle': ['off'],
    'react/self-closing-comp': [
      'error',
      {
        component: false,
        html: false,
      },
    ],
  },
});
