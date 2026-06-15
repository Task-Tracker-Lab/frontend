import { type TAuth } from 'entities/auth';
import { ComponentType, SVGProps } from 'react';
import { GithubIcon, GoogleIcon, VkontakteIcon, YandexIcon } from '../ui/OAuthIcons';
import { routes } from 'shared/config';
import { StartOauthParams } from './types';

const getRoute = (provider: TAuth.OAuthProvider) => {
  const params = new URLSearchParams({
    provider,
    startOAuth: 'true',
  } satisfies Record<keyof StartOauthParams, string>);

  return `${routes.auth.oauth()}?${params.toString()}`;
};

export type OAuthProviderConfig = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  color?: string;
};

export const OAUTH_PROVIDERS: Record<TAuth.OAuthProvider, OAuthProviderConfig> = {
  yandex: { label: 'Яндекс', icon: YandexIcon, href: getRoute('yandex') },
  vkontakte: {
    label: 'Вконтакте',
    icon: VkontakteIcon,
    href: getRoute('vkontakte'),
    color: '#07f',
  },
  google: { label: 'Google', icon: GoogleIcon, href: getRoute('google') },
  github: {
    label: 'GitHub',
    icon: GithubIcon,
    href: getRoute('github'),
    color: '#24292f',
  },
};
export const OAUTH_PROVIDERS_COUNT = Object.keys(OAUTH_PROVIDERS).length;
