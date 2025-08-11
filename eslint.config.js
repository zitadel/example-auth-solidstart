import js from '@eslint/js';
import solid from 'eslint-plugin-solid/configs/typescript';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  },
];
