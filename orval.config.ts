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
        type: 'typescript', //можно установить zod, есть проблемы с генерацией
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
  /*  zod: {
    //тоже проблемный вариант
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
      client: 'zod',
      target: './endpoints',
      fileExtension: '.zod.ts',
    },
  },*/
});
