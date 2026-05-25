export type MockBoardColumn = {
  id: string;
  name: string;
};

export type MockBoardCard = {
  id: string;
  name: string;
  column: string;
};

export type MockBoard = {
  id: string;
  name: string;
  columns: MockBoardColumn[];
  cards: MockBoardCard[];
};

export const MOCK_BOARDS: MockBoard[] = [
  {
    id: 'planning',
    name: 'Планирование проекта',
    columns: [
      { id: 'ideas', name: 'Идеи' },
      { id: 'plan', name: 'План' },
      { id: 'docs', name: 'Документация' },
    ],
    cards: [
      { id: 'planning-1', name: 'Сбор вдохновения', column: 'ideas' },
      { id: 'planning-2', name: 'Цели проекта', column: 'ideas' },
      { id: 'planning-3', name: 'Дорожная карта', column: 'plan' },
      { id: 'planning-4', name: 'Ресурсы', column: 'plan' },
      { id: 'planning-5', name: 'Техническая', column: 'docs' },
      { id: 'planning-6', name: 'Коммуникация', column: 'docs' },
    ],
  },
  {
    id: 'in-progress',
    name: 'Задачи в работе',
    columns: [
      { id: 'todo', name: 'Ожидает выполнения' },
      { id: 'in-progress', name: 'В работе' },
      { id: 'review', name: 'На проверке' },
      { id: 'bank-review', name: 'На проверке в банке' },
      { id: 'done', name: 'Завершено' },
    ],
    cards: [
      { id: 'work-1', name: 'Подготовить бриф', column: 'todo' },
      { id: 'work-2', name: 'Дизайн макета', column: 'in-progress' },
      { id: 'work-3', name: 'Проверка текстов', column: 'review' },
      { id: 'work-4', name: 'Проверить реквизиты', column: 'bank-review' },
      { id: 'work-5', name: 'Готово к запуску', column: 'done' },
    ],
  },
  {
    id: 'results',
    name: 'Фиксация результатов',
    columns: [
      { id: 'reports', name: 'Отчёты' },
      { id: 'insights', name: 'Выводы' },
      { id: 'documentation', name: 'Документация' },
    ],
    cards: [
      { id: 'results-1', name: 'Итоговый отчёт', column: 'reports' },
      { id: 'results-2', name: 'Рефлексия', column: 'insights' },
      { id: 'results-3', name: 'Запись результатов', column: 'documentation' },
    ],
  },
];
