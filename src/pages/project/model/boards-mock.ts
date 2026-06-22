// TODO: вынести функцию и иконки в shared или сделать свои
import { PROJECT_ICONS } from 'entities/project';

export type MockBoardColumn = Record<string, MockBoardTask[]>;

export type MockAuthor = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type MockBoardTask = {
  id: string;
  name: string;
  columnId: string;
  assignee: MockAuthor;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
};

export type ColumnTitles = Record<string, { title: string; icon?: string }>;

export type MockBoard = {
  id: string;
  name: string;
  columns: MockBoardColumn;
  columnTitles: ColumnTitles;
};

export const MOCK_BOARDS: MockBoard[] = [
  {
    id: 'planning',
    name: 'Планирование проекта',
    columnTitles: {
      ideas: { title: 'Идеи', icon: PROJECT_ICONS[0] },
      plan: { title: 'План' },
      docs: { title: 'Документы' },
    },
    columns: {
      ideas: [
        {
          id: '1',
          name: 'Сбор вдохновения',
          columnId: 'ideas',
          priority: 'high',
          assignee: { id: '1', name: 'Андрей' },
          dueDate: '2023-10-05',
          description: 'Description',
        },
        {
          id: '2',
          name: 'Цели проекта',
          columnId: 'ideas',
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
          columnId: 'plan',
          priority: 'low',
          assignee: { id: '3', name: 'Иван' },
          dueDate: '2023-10-07',
          description: 'Description',
        },
        {
          id: '4',
          name: 'Ресурсы',
          columnId: 'plan',
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
          columnId: 'docs',
          priority: 'high',
          assignee: { id: '5', name: 'Дмитрий' },
          dueDate: '2023-10-09',
          description: 'Description',
        },
        {
          id: '6',
          name: 'Коммуникация',
          columnId: 'docs',
          priority: 'medium',
          assignee: { id: '6', name: 'Анна' },
          dueDate: '2023-10-10',
          description: 'Description',
        },
      ],
    },
  },
  {
    id: 'in-progress',
    name: 'Задачи в работе',
    columnTitles: {
      todo: { title: 'Ожидает выполнения' },
      inProgress: { title: 'В работе' },
      review: { title: 'На проверке' },
      bankReview: { title: 'На проверке в банке' },
      done: { title: 'Завершено' },
    },
    columns: {
      todo: [
        {
          id: '11',
          name: 'Дизайн макета',
          columnId: 'ideas',
          priority: 'high',
          assignee: { id: '1', name: 'Андрей' },
          dueDate: '2023-10-05',
          description: 'Description',
        },
      ],
      inProgress: [
        {
          id: '31',
          name: 'Подготовить бриф',
          columnId: 'plan',
          priority: 'low',
          assignee: { id: '3', name: 'Иван' },
          dueDate: '2023-10-07',
          description: 'Description',
        },
      ],
      review: [
        {
          id: '51',
          name: 'Техническая',
          columnId: 'docs',
          priority: 'high',
          assignee: { id: '5', name: 'Дмитрий' },
          dueDate: '2023-10-09',
          description: 'Description',
        },
        {
          id: '61',
          name: 'Коммуникация',
          columnId: 'docs',
          priority: 'medium',
          assignee: { id: '6', name: 'Анна' },
          dueDate: '2023-10-10',
          description: 'Description',
        },
      ],
      bankReview: [],
      done: [],
    },
  },
  {
    id: 'results',
    name: 'Фиксация результатов',
    columnTitles: {
      reports: { title: 'Отчёты', icon: '📊' },
      insights: { title: 'Выводы', icon: '💡' },
      documentation: { title: 'Документация', icon: '📄' },
    },
    columns: {
      reports: [
        {
          id: 'results-1',
          name: 'Итоговый отчёт',
          columnId: 'reports',
          priority: 'high',
          assignee: { id: '6', name: 'Аналитик' },
          dueDate: '2023-10-20',
          description: 'Собрать все метрики и графики',
        },
      ],
      insights: [
        {
          id: 'results-2',
          name: 'Рефлексия',
          columnId: 'insights',
          priority: 'medium',
          assignee: { id: '7', name: 'Тимлид' },
          dueDate: '2023-10-22',
          description: 'Что получилось, а что нет',
        },
      ],
      documentation: [
        {
          id: 'results-3',
          name: 'Запись результатов',
          columnId: 'documentation',
          priority: 'low',
          assignee: { id: '8', name: 'Документалист' },
          dueDate: '2023-10-25',
          description: 'Задокументировать выводы в Confluence',
        },
      ],
    },
  },
];
