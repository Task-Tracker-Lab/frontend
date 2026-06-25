import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import storybook from 'eslint-plugin-storybook';
import checkFile from 'eslint-plugin-check-file';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginQuery from '@tanstack/eslint-plugin-query';

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  ...nextVitals,
  ...nextTs,
  ...pluginQuery.configs['flat/recommended'],
  ...storybook.configs['flat/recommended'],
  {
    files: ['src/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/{page,layout,loading,error,not-found,template,default,route}.{jsx,tsx}':
            'NEXT_JS_PAGE_ROUTER_FILENAME_CASE',
          '**/!({page,layout,loading,error,not-found,template,default,route,index,*.stories}).{jsx,tsx}':
            'PASCAL_CASE',
          '**/*{Error,Type,Types,Interface,Props,Dto,Response,Request,Contract,Contracts}.ts':
            'PASCAL_CASE',
          '**/!(*{Error,Type,Types,Interface,Props,Dto,Response,Request,Contract,Contracts,use}*).ts':
            'KEBAB_CASE',
          '**/*.{js,mjs,cjs,mts,cts}': 'KEBAB_CASE',
          '**/use*.{ts,tsx}': 'CAMEL_CASE',
          '**/*.stories.{jsx,tsx}': 'KEBAB_CASE',
          '**/index.tsx': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'KEBAB_CASE',
        },
      ],
      'object-shorthand': ['warn', 'always'],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
