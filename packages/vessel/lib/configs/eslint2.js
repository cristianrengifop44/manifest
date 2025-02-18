'use strict';

const constants = require('../constants2.js');

const fs = require('fs');

require('../utils/index2.js');

const path = require('path');

const getRootProjectReferences = require('../utils/getRootProjectReferences2.js');

const _interopDefault = e => e && e.__esModule ? e : {
  default: e
};

const fs__default = /*#__PURE__*/_interopDefault(fs);

const path__default = /*#__PURE__*/_interopDefault(path);

let project = '';
const tsConfigEslintPath = path__default.default.join(constants.ROOT, 'tsconfig.eslint.json');

if (fs__default.default.existsSync(tsConfigEslintPath)) {
  project = tsConfigEslintPath;
}

if (!project) {
  project = getRootProjectReferences.getRootProjectReferences()?.map(ref => path__default.default.join(constants.ROOT, ref.path, 'tsconfig.json')) ?? constants.TSCONFIG_JSON_PATH;
}

const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:prettier/recommended'],
  plugins: ['import', '@typescript-eslint'],
  ignore: [...constants.IGNORE_LIST, '*.min.js', '*.map', '*.snap'],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  globals: {
    [`__DEV__`]: 'readonly',
    [`__PROD__`]: 'readonly'
  },
  rules: {
    'no-param-reassign': 'off',
    'no-use-before-define': 0,
    'import/first': 'error',
    'import/prefer-default-export': 'off',
    'import/newline-after-import': 'error',
    'import/no-amd': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/order': ['error', {
      groups: [],
      'newlines-between': 'never'
    }],
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off'
  },
  overrides: [{
    files: ['*.tsx'],
    extends: ['plugin:react-hooks/recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
    plugins: ['jsx-a11y', 'react', 'react-hooks', 'react-perf'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/display-name': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/sort-prop-types': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error'
    }
  }, {
    files: ['**/*.{spec,test}.*'],
    env: {
      jest: true,
      'jest/globals': true
    },
    extends: ['plugin:jest/recommended'],
    plugins: ['jest'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'jest/no-alias-methods': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-done-callback': 'error',
      'jest/no-export': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/no-if': 'error',
      'jest/no-jasmine-globals': 'error',
      'jest/no-jest-import': 'error',
      'jest/no-standalone-expect': 'error',
      'jest/no-test-prefixes': 'error',
      'jest/no-test-return-statement': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/prefer-spy-on': 'error',
      'jest/prefer-to-be': 'warn',
      'jest/prefer-to-contain': 'warn',
      'jest/prefer-to-have-length': 'warn',
      'jest/prefer-todo': 'error',
      'jest/valid-expect': 'error',
      'jest/valid-title': 'error'
    }
  }]
};
module.exports = config;
//# sourceMappingURL=eslint2.js.map
