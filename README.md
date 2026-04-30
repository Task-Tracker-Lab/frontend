# Task Tracker Frontend

Frontend-приложение для Task Tracker на Next.js.

## Стек

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Zustand
- Tailwind CSS
- Storybook
- Vitest
- Grafana Faro / OpenTelemetry

## Требования

- Node.js, совместимый с Next.js 16
- pnpm 10
- Docker, если нужен локальный backend или observability-стек

## Быстрый старт

Создайте локальный env-файл:

```bash
cp .env.example .env
```

Установите зависимости и запустите приложение:

```bash
pnpm install
pnpm dev
```

## Скрипты

```bash
pnpm dev              # запуск dev-сервера
pnpm build            # production-сборка
pnpm start            # запуск production-сборки
pnpm lint             # ESLint
pnpm lint:fix         # ESLint с автоисправлениями
pnpm lint:fsd         # проверка Feature-Sliced Design правил
pnpm typecheck        # проверка TypeScript
pnpm format:check     # проверка форматирования
pnpm test             # Vitest в watch-режиме
pnpm test:ci          # Vitest один раз для CI
pnpm storybook        # запуск Storybook на 6006 порту
```

## Локальный backend

Для разработки с локальным backend, Postgres и Redis используйте Docker Compose из `infra/dev`.

```bash
docker compose -f ./infra/dev/compose.dev.yaml --profile infra up --pull always --build -d -V
```

Подробнее: `infra/dev/README.md`.

## Observability

Локальный стек Grafana, Loki, Tempo и Alloy описан в `infra/observability/README.md`.

Быстрый запуск:

```bash
cp ./infra/observability/.env.example ./infra/observability/.env
docker compose -f ./infra/observability/compose.observability.yaml up -d
```

Grafana будет доступна на `http://localhost:3010`.
