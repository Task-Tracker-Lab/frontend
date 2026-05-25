import type { TProject } from 'entities/project';
import type { ShareTtlOption } from './types';

export function ttlOptionToBody(option: ShareTtlOption): TProject.CreateShareTokenBody {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + Number(option));
  return { ttl: expiresAt.toISOString() };
}
