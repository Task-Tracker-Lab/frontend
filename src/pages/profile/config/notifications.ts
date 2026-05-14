import { NotificationItem } from '../model/notifications';

export const notificationItems: {
  email: NotificationItem<'email'>[];
  push: NotificationItem<'push'>[];
} = {
  email: [
    {
      key: 'mentions',
      label: 'Упоминания',
      ariaLabel: 'Email уведомления об упоминаниях',
    },
    {
      key: 'daily_summary',
      label: 'Ежедневная сводка',
      ariaLabel: 'Email ежедневная сводка',
    },
    {
      key: 'task_assigned',
      label: 'Назначение задач',
      ariaLabel: 'Email уведомления о назначении задач',
    },
  ],
  push: [
    {
      key: 'reminders',
      label: 'Напоминания',
      ariaLabel: 'Push напоминания',
    },
    {
      key: 'task_assigned',
      label: 'Назначение задач',
      ariaLabel: 'Push уведомления о назначении задач',
    },
  ],
};
