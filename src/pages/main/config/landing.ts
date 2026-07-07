import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  GraduationCap,
  HardHat,
  Languages,
  LayoutTemplate,
  MousePointerClick,
  Scissors,
  Store,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import type { Route } from 'next';
import { routes } from 'shared/config';

interface LandingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface LandingTemplate {
  icon: LucideIcon;
  title: string;
  description: string;
  columns: [string, string, string];
  accent: string;
}

interface LandingStep {
  title: string;
  description: string;
}

interface LandingTestimonial {
  quote: string;
  name: string;
  role: string;
  business: string;
}

const landingIndustries = [
  'Магазины и розница',
  'Салоны и сервисы',
  'Рестораны и кафе',
  'Офисы и администрация',
  'Строительство и ремонт',
  'Обучение и курсы',
  'Производство и склады',
  'Клиники и медцентры',
  'Логистика и доставка',
  'Агентства и студии',
] as const;

const landingHeroAudience =
  'Для розницы, услуг, общепита, офисов, строительства, образования, медицины, логистики и любых команд, где важна простота.';

const landingFeatures: LandingFeature[] = [
  {
    icon: LayoutTemplate,
    title: 'Готовые доски под ваш бизнес',
    description:
      'Не нужно придумывать структуру с нуля. Выберите шаблон под свою сферу — от магазина и салона до стройки и учебного центра — и сразу работайте.',
  },
  {
    icon: Languages,
    title: 'Понятные слова',
    description:
      'Никаких спринтов, бэклогов и канбан-досок. Только привычные формулировки: «новые заявки», «в работе», «готово».',
  },
  {
    icon: MousePointerClick,
    title: 'Низкий порог входа',
    description:
      'Разберётся любой сотрудник за несколько минут. Без обучения, вебинаров и длинных инструкций.',
  },
  {
    icon: Users,
    title: 'Команда на одной волне',
    description:
      'Пригласите коллег по ссылке. Все видят одни и те же задачи и статусы — без путаницы в чатах.',
  },
];

const landingTemplates: LandingTemplate[] = [
  {
    icon: Store,
    title: 'Магазин',
    description: 'Заказы, поставки и выкладка товара',
    columns: ['Новые заказы', 'Собираем', 'Выдано'],
    accent: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  },
  {
    icon: Scissors,
    title: 'Салон красоты',
    description: 'Записи, мастера и расходники',
    columns: ['Записи', 'Клиент в кресле', 'Завершено'],
    accent: 'bg-pink-500/10 text-pink-700 dark:text-pink-300',
  },
  {
    icon: UtensilsCrossed,
    title: 'Ресторан',
    description: 'Заказы, кухня и зал',
    columns: ['Принято', 'Готовим', 'Подано'],
    accent: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
  },
  {
    icon: Building2,
    title: 'Офис',
    description: 'Поручения, согласования, документы',
    columns: ['Новые', 'В работе', 'Сделано'],
    accent: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
  },
  {
    icon: HardHat,
    title: 'Строительство',
    description: 'Объекты, бригады и снабжение',
    columns: ['План', 'На объекте', 'Сдано'],
    accent: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
  {
    icon: GraduationCap,
    title: 'Обучение',
    description: 'Группы, материалы и расписание',
    columns: ['Записались', 'Идёт курс', 'Выпуск'],
    accent: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
];

const landingSteps: LandingStep[] = [
  {
    title: 'Выберите шаблон',
    description: 'Укажите сферу бизнеса — доска уже настроена под ваши процессы.',
  },
  {
    title: 'Пригласите команду',
    description: 'Отправьте ссылку коллегам. Каждый сразу видит свои задачи.',
  },
  {
    title: 'Ведите дела каждый день',
    description: 'Перетаскивайте карточки по этапам. Всё наглядно и без лишних слов.',
  },
];

const landingTestimonials: LandingTestimonial[] = [
  {
    quote:
      'Раньше всё было в блокноте и WhatsApp. Теперь вся команда видит, что на ком висит — и никто не теряет заказы.',
    name: 'Анна К.',
    role: 'Владелица',
    business: 'салон красоты',
  },
  {
    quote:
      'Нам не нужны были «спринты» и «бэклоги». Здесь всё по-человечески: приняли заказ, готовим, отдали.',
    name: 'Игорь М.',
    role: 'Управляющий',
    business: 'кофейня',
  },
  {
    quote:
      'Подключили офис за один день. Бухгалтерия, закупки и администраторы — все работают в одной системе.',
    name: 'Елена С.',
    role: 'Директор',
    business: 'торговая компания',
  },
];

interface LandingFooterLink {
  label: string;
  href: Route | `#${string}`;
}

interface LandingFooterSection {
  title: string;
  links: LandingFooterLink[];
}

const landingFooterDescription =
  'Трекер задач для обычного бизнеса. Готовые доски, понятные слова и быстрый старт без обучения.';

const landingFooterSections: LandingFooterSection[] = [
  {
    title: 'Продукт',
    links: [
      { label: 'Возможности', href: '#features' },
      { label: 'Шаблоны досок', href: '#templates' },
      { label: 'Как начать', href: '#how-it-works' },
    ],
  },
  {
    title: 'Аккаунт',
    links: [
      { label: 'Регистрация', href: routes.auth.signup() },
      { label: 'Вход', href: routes.auth.signin() },
    ],
  },
];

const landingFooterHighlights = [
  'Бесплатный старт',
  'Без кредитной карты',
  'Настройка за 5 минут',
] as const;

export {
  landingFeatures,
  landingFooterDescription,
  landingFooterHighlights,
  landingFooterSections,
  landingHeroAudience,
  landingIndustries,
  landingSteps,
  landingTemplates,
  landingTestimonials,
  type LandingFeature,
  type LandingFooterLink,
  type LandingFooterSection,
  type LandingStep,
  type LandingTemplate,
  type LandingTestimonial,
};
