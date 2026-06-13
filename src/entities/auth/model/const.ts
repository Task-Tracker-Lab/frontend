import { type TAuth } from 'entities/auth';
import YandexIcon from 'public/yandex-logo.svg';
import VkontakteIcon from 'public/vkontakte-logo.svg';
import GoogleIcon from 'public/google-logo.svg';
import GithubIcon from 'public/github-logo.svg';

export const MIN_PASS_LENGTH = 8;
export const MAX_PASS_LENGTH = 32;
export const OTP_LENGTH = 6;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export type OAuthProviderMeta = {
  label: string;
  iconSrc: string;
  buttonClassName?: string;
};

export const OAUTH_PROVIDERS: Record<TAuth.OAuthProvider, OAuthProviderMeta> = {
  yandex: {
    label: 'Яндекс',
    iconSrc: YandexIcon,
    buttonClassName: 'text-[#fc3f1d] hover:text-[#fc3f1d]',
  },
  vkontakte: {
    label: 'Вконтакте',
    iconSrc: VkontakteIcon,
    buttonClassName: 'bg-[#07f] hover:bg-[#07f]',
  },
  google: { label: 'Google', iconSrc: GoogleIcon },
  github: {
    label: 'GitHub',
    iconSrc: GithubIcon,
    buttonClassName: 'bg-[#24292f] hover:bg-[#24292f] text-white hover:text-white ',
  },
} as const;
export const OAUTH_PROVIDERS_COUNT = Object.keys(OAUTH_PROVIDERS).length;

export const authKeys = {
  all: ['auth'] as const,
  availableProviders: () => [...authKeys.all, 'providers', 'available'] as const,
  connectedProviders: () => [...authKeys.all, 'providers', 'connected'] as const,
};
