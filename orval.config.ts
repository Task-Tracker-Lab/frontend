import { defineConfig } from 'orval';
import path from 'path';

const WORK_SPACE = 'src/shared/api';

export default defineConfig({
  api: {
    input: {
      target: path.resolve(__dirname, WORK_SPACE, 'openapi', 'openapi.json'),
      filters: {
        mode: 'exclude',
        tags: ['Prometheus', 'System'],
      },
    },
    output: {
      workspace: WORK_SPACE,
      mode: 'tags-split',
      client: 'react-query',
      target: './endpoints',
      schemas: {
        path: './schemas',
        type: 'zod',
      },
      tsconfig: 'tsconfig.json',
      httpClient: 'axios',
      override: {
        mutator: {
          path: 'instance.ts',
          name: 'instance',
        },
      },
      clean: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write .',
    },
  },
});
