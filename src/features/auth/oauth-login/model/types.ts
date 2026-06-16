import { TAuth } from 'entities/auth';

export type StartOauthParams = {
  provider?: TAuth.OAuthProvider;
  startOAuth?: 'true' | 'false';
};
