import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals'; // Добавили для работы окружений

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.es2021,
      },
    },
  },
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'prettier/prettier': 'warn',
    },
  },

  {
    ignores: ['node_modules', 'dist', '.next', 'build', '**/jest.config.ts', '**/*.config.ts'],
  },
];
