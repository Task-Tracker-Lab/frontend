import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // disable the `public-api` rule for files in the shared/config
    files: ['./src/shared/config/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
]);
