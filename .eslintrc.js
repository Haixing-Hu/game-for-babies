module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-param-reassign': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'comma-dangle': ["error", "only-multiline"],
    'no-else-return': 0,
    'no-restricted-syntax': 0,
    'semi': [2, 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'spaced-comment': ['error', 'always', {
      'exceptions': ['*'],
    }],
    'prefer-destructuring': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-multi-spaces': ['error', {
      ignoreEOLComments: true,
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
