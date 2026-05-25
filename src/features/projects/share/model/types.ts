import type { SHARE_TTL_OPTIONS } from '../config/ttl-options';

export type ShareTtlOption = (typeof SHARE_TTL_OPTIONS)[number]['value'];
