export type RoleKey = 'Admin' | 'Member' | 'Guest' | 'Viewer';

export type PermissionKey =
  | 'task.create'
  | 'task.edit'
  | 'task.delete'
  | 'project.invite'
  | 'project.create'
  | 'billing.view';

export const PERMISSION_GROUPS: {
  label: string;
  items: { key: PermissionKey; label: string }[];
}[] = [
  {
    label: 'Управление задачами',
    items: [
      { key: 'task.create', label: 'Создавать задачи' },
      { key: 'task.edit', label: 'Редактировать задачи' },
      { key: 'task.delete', label: 'Удалять задачи' },
    ],
  },
  {
    label: 'Доступ к проектам',
    items: [
      { key: 'project.invite', label: 'Приглашать участников' },
      { key: 'project.create', label: 'Создавать проекты' },
    ],
  },
  {
    label: 'Биллинг',
    items: [{ key: 'billing.view', label: 'Просмотр счетов' }],
  },
];

export const ROLES: { key: RoleKey; description: string; members: number; locked?: boolean }[] = [
  {
    key: 'Admin',
    description: 'Полный контроль команды и биллинг.',
    members: 2,
    locked: true,
  },
  { key: 'Member', description: 'Стандартный доступ участника.', members: 12 },
  { key: 'Guest', description: 'Внешний, ограниченный доступ к проектам.', members: 4 },
  { key: 'Viewer', description: 'Доступ к проектам только для чтения.', members: 7 },
];

export const DEFAULTS: Record<RoleKey, Record<PermissionKey, boolean>> = {
  Admin: {
    'task.create': true,
    'task.edit': true,
    'task.delete': true,
    'project.invite': true,
    'project.create': true,
    'billing.view': true,
  },
  Member: {
    'task.create': true,
    'task.edit': true,
    'task.delete': false,
    'project.invite': false,
    'project.create': true,
    'billing.view': false,
  },
  Guest: {
    'task.create': true,
    'task.edit': false,
    'task.delete': false,
    'project.invite': false,
    'project.create': false,
    'billing.view': false,
  },
  Viewer: {
    'task.create': false,
    'task.edit': false,
    'task.delete': false,
    'project.invite': false,
    'project.create': false,
    'billing.view': false,
  },
};
