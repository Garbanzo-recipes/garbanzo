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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Adding next two rules to avoid bug in babel-eslint:
    // https://github.com/babel/babel-eslint/issues/799
    indent: [
      'warn', 2,
      { ignoredNodes: ['TemplateLiteral'] },
    ],
    'template-curly-spacing': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
