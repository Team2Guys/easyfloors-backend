// @ts-check
import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default {
  ignores: ['eslint.config.mjs', 'dist/', 'node_modules/'], // Ignore build and dependencies
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    // ✅ Prettier Rules
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    // ✅ TypeScript Rules (Strict Type Safety)
    '@typescript-eslint/explicit-function-return-type': 'warn', // Warn if return type is not specified
    '@typescript-eslint/no-explicit-any': 'off', // Allow `any` in NestJS where necessary
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused args with `_`
    '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit type declaration

    // ✅ NestJS Best Practices
    '@typescript-eslint/no-floating-promises': 'error', // Prevent unhandled promises
    '@typescript-eslint/no-unsafe-argument': 'warn', // Warn if unsafe argument types are used
    '@typescript-eslint/no-namespace': 'off', // Allow `namespace` for modularization
    '@typescript-eslint/no-empty-function': 'warn', // Warn for empty functions (except lifecycle hooks)
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: 'Use object instead',
          Function: 'Use a specific function type',
          '{}': 'Use a more specific type',
        },
      },
    ],

    // ✅ Code Quality
    'no-console': 'warn', // Warn when using `console.log`
    'no-debugger': 'error', // Prevent use of `debugger`
    'no-var': 'error', // Enforce `let` and `const` instead of `var`
    'prefer-const': 'warn', // Prefer `const` where possible
    'eqeqeq': ['error', 'always'], // Enforce strict equality
  },
};
