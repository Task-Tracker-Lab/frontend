import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // disable the `public-api` rule for files in the shared/config
    files: ['./src/shared/config/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
  {
    //todo удалить позже
    files: [
      './src/features/boards/**',
      './src/entities/board/**',
      './src/entities/task/**',
      './src/features/task/**',
      './src/features/projects/archive/**',
      './src/features/projects/remove/**',
      './src/features/projects/share/**',
      './src/widgets/task/**',
      './src/widgets/tabs-nav/**',
    ],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
]);
