import GithubIcon from 'github-logo.svg';
import GoogleIcon from 'google-logo.svg';
import VkontakteIcon from 'vkontakte-logo.svg';
import YandexIcon from 'yandex-logo.svg';
import { OAuthProvider } from '../model/types';

export type OAuthProviderMeta = {
  iconSrc: string;
  className?: string;
};

export const OAUTH_PROVIDERS: Record<OAuthProvider, OAuthProviderMeta> = {
  yandex: {
    iconSrc: YandexIcon,
    className: 'text-[#fc3f1d] hover:text-[#fc3f1d]',
  },
  vkontakte: {
    iconSrc: VkontakteIcon,
    className: 'bg-[#07f] hover:bg-[#07f]',
  },
  google: { iconSrc: GoogleIcon },
  github: {
    iconSrc: GithubIcon,
    className: 'bg-[#24292f] hover:bg-[#24292f] text-white hover:text-white ',
  },
} as const;
