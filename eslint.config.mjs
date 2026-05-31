import js from '@eslint/js';
import ts from 'typescript-eslint';
import solid from 'eslint-plugin-solid/configs/typescript';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default ts.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.output/**',
      '.vinxi/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
      },
      globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
    },
    rules: {
      ...solid.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.node, ...globals.es2021 },
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx,js,mjs}', 'test/**/*.{ts,tsx,js,mjs}'],
    languageOptions: { globals: { ...globals.jest, ...globals.node } },
  },
  prettier,
);
