export type MockBoardColumn = Record<string, MockBoardTask[]>;

export type MockAuthor = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type MockBoardTask = {
  id: string;
  name: string;
  column: string;
  assignee: MockAuthor;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
};

export type MockBoard = {
  id: string;
  name: string;
  columns: MockBoardColumn;
  columnTitles: Record<string, string>;
};

const COLUMN_TITLES: Record<string, string> = {
  ideas: 'Идеи',
  plan: 'План',
  docs: 'Документы',
};

export const MOCK_BOARDS: MockBoard[] = [
  {
    id: 'planning',
    name: 'Планирование проекта',
    columnTitles: COLUMN_TITLES,
    columns: {
      ideas: [
        {
          id: '1',
          name: 'Сбор вдохновения',
          column: 'ideas',
          priority: 'high',
          assignee: { id: '1', name: 'Андрей' },
          dueDate: '2023-10-05',
          description: 'Description',
        },
        {
          id: '2',
          name: 'Цели проекта',
          column: 'ideas',
          priority: 'medium',
          assignee: { id: '2', name: 'Мария' },
          dueDate: '2023-10-06',
          description: 'Description',
        },
      ],
      plan: [
        {
          id: '3',
          name: 'Дорожная карта',
          column: 'plan',
          priority: 'low',
          assignee: { id: '3', name: 'Иван' },
          dueDate: '2023-10-07',
          description: 'Description',
        },
        {
          id: '4',
          name: 'Ресурсы',
          column: 'plan',
          priority: 'medium',
          assignee: { id: '4', name: 'Сергей' },
          dueDate: '2023-10-08',
          description: 'Description',
        },
      ],
      docs: [
        {
          id: '5',
          name: 'Техническая',
          column: 'docs',
          priority: 'high',
          assignee: { id: '5', name: 'Дмитрий' },
          dueDate: '2023-10-09',
          description: 'Description',
        },
        {
          id: '6',
          name: 'Коммуникация',
          column: 'docs',
          priority: 'medium',
          assignee: { id: '6', name: 'Анна' },
          dueDate: '2023-10-10',
          description: 'Description',
        },
      ],
    },
    // { id: 'ideas', name: 'Идеи' },
    // { id: 'plan', name: 'План' },
    // { id: 'docs', name: 'Документация' },
  },
  // {
  //   id: 'in-progress',
  //   name: 'Задачи в работе',
  //   columns: [
  //     { id: 'todo', name: 'Ожидает выполнения' },
  //     { id: 'in-progress', name: 'В работе' },
  //     { id: 'review', name: 'На проверке' },
  //     { id: 'bank-review', name: 'На проверке в банке' },
  //     { id: 'done', name: 'Завершено' },
  //   ],
  //   cards: [
  //     { id: 'work-1', name: 'Подготовить бриф', column: 'todo' },
  //     { id: 'work-2', name: 'Дизайн макета', column: 'in-progress' },
  //     { id: 'work-3', name: 'Проверка текстов', column: 'review' },
  //     { id: 'work-4', name: 'Проверить реквизиты', column: 'bank-review' },
  //     { id: 'work-5', name: 'Готово к запуску', column: 'done' },
  //   ],
  // },
  // {
  //   id: 'results',
  //   name: 'Фиксация результатов',
  //   columns: [
  //     { id: 'reports', name: 'Отчёты' },
  //     { id: 'insights', name: 'Выводы' },
  //     { id: 'documentation', name: 'Документация' },
  //   ],
  //   cards: [
  //     { id: 'results-1', name: 'Итоговый отчёт', column: 'reports' },
  //     { id: 'results-2', name: 'Рефлексия', column: 'insights' },
  //     { id: 'results-3', name: 'Запись результатов', column: 'documentation' },
  //   ],
  // },
];
