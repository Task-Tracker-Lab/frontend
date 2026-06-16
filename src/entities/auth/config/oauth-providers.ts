import { type TAuth } from 'entities/auth';
import YandexIcon from 'public/yandex-logo.svg';
import VkontakteIcon from 'public/vkontakte-logo.svg';
import GoogleIcon from 'public/google-logo.svg';
import GithubIcon from 'public/github-logo.svg';

export type OAuthProviderMeta = {
  iconSrc: string;
  buttonClassName?: string;
};

export const OAUTH_PROVIDERS: Record<TAuth.OAuthProvider, OAuthProviderMeta> = {
  yandex: {
    iconSrc: YandexIcon,
    buttonClassName: 'text-[#fc3f1d] hover:text-[#fc3f1d]',
  },
  vkontakte: {
    iconSrc: VkontakteIcon,
    buttonClassName: 'bg-[#07f] hover:bg-[#07f]',
  },
  google: { iconSrc: GoogleIcon },
  github: {
    iconSrc: GithubIcon,
    buttonClassName: 'bg-[#24292f] hover:bg-[#24292f] text-white hover:text-white ',
  },
} as const;
