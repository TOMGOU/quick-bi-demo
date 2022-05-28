module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
    parser: '@typescript-eslint/parser',
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/typescript'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  globals: {
    DEBUG: true,
  },
  // add your custom rules here
  rules: {
    'func-names': 0,
    'arrow-parens': 0,
    'linebreak-style': 'off',
    'generator-star-spacing': 0,
    'no-param-reassign': 0,
    'max-len': 'off',
    'no-console': 0,
    'no-unused-expressions': 0,
    'no-useless-return': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'import/no-cycle': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': ['error', { anonymous: 'ignore', named: 'ignore', asyncArrow: 'ignore' }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'class-methods-use-this': 0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }
    ],
  },
};
