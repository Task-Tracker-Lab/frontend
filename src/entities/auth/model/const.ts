import { type TAuth } from 'entities/auth';
import { ComponentType, SVGProps } from 'react';
import { GithubIcon, GoogleIcon, VkontakteIcon, YandexIcon } from 'shared/ui';

export const MIN_PASS_LENGTH = 8;
export const MAX_PASS_LENGTH = 32;
export const OTP_LENGTH = 6;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export type OAuthProviderMeta = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  buttonClassName?: string;
};

export const OAUTH_PROVIDERS: Record<TAuth.OAuthProvider, OAuthProviderMeta> = {
  yandex: {
    label: 'Яндекс',
    icon: YandexIcon,
    buttonClassName: 'text-[#fc3f1d] hover:text-[#fc3f1d]',
  },
  vkontakte: {
    label: 'Вконтакте',
    icon: VkontakteIcon,
    buttonClassName: 'bg-[#07f] hover:bg-[#07f]',
  },
  google: { label: 'Google', icon: GoogleIcon },
  github: {
    label: 'GitHub',
    icon: GithubIcon,
    buttonClassName: 'bg-[#24292f] hover:bg-[#24292f] ',
  },
};
export const OAUTH_PROVIDERS_COUNT = Object.keys(OAUTH_PROVIDERS).length;

export const authKeys = {
  all: ['auth'] as const,
  availableProviders: () => [...authKeys.all, 'providers', 'available'] as const,
  connectedProviders: () => [...authKeys.all, 'providers', 'connected'] as const,
};
