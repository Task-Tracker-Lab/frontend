import { type TAuth } from 'entities/auth';
import { ComponentType, SVGProps } from 'react';
import { GithubIcon, GoogleIcon, VkontakteIcon, YandexIcon } from '../ui/OAuthIcons';
import { routes } from 'shared/config';

export type StartOauthParams = {
  provider: TAuth.OAuthProvider;
  startOAuth: 'true' | 'false';
};
const getRoute = (provider: TAuth.OAuthProvider) => {
  const params = new URLSearchParams({
    provider,
    startOAuth: 'true',
  } satisfies Record<keyof StartOauthParams, string>);
  return `${routes.auth.oauth()}?${params.toString()}`;
};

export const OAUTH_PROVIDERS: Record<
  TAuth.OAuthProvider,
  {
    name: TAuth.OAuthProvider;
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: string;
    color?: string;
  }
> = {
  yandex: { label: 'Яндекс', name: 'yandex', icon: YandexIcon, href: getRoute('yandex') },
  vkontakte: {
    label: 'Вконтакте',
    name: 'vkontakte',
    icon: VkontakteIcon,
    href: getRoute('vkontakte'),
    color: '#07f',
  },
  google: { label: 'Google', name: 'google', icon: GoogleIcon, href: getRoute('google') },
  github: {
    label: 'GitHub',
    name: 'github',
    icon: GithubIcon,
    href: getRoute('github'),
    color: '#24292f',
  },
};
