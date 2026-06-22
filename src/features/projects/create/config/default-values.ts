import { PROJECT_COLORS, PROJECT_ICONS } from 'entities/project';
import type { CreateProjectFormValues } from '../model/types';

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function getDefaultCreateProjectValues(): CreateProjectFormValues {
  return {
    name: '',
    slug: '',
    teamId: null,
    description: '',
    icon: pickRandom(PROJECT_ICONS),
    color: pickRandom(PROJECT_COLORS),
    visibility: 'private',
    status: 'active',
  };
}
