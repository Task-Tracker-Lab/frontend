import { Env } from 'shared/config/env';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export {};
