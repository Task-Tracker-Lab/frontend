import { OAuthConnectionStatus } from '../model/profile';

export const OAUTH_STATUS_LABELS = {
  connected: 'Подключен',
  disconnected: 'Не подключен',
  unknown: 'Не удалось проверить',
} as const satisfies Record<OAuthConnectionStatus, string>;
