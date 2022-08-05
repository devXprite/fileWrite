/* eslint-disable unicorn/prefer-module */
module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'standard',
    'plugin:unicorn/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}
