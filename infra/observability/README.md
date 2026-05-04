## Observability stack

Локальный стек для логов, трейсов и frontend observability:

- Grafana
- Loki
- Tempo
- Grafana Alloy

## Запуск

Из корня репозитория.

Создайте локальный env-файл:

```bash
cp ./infra/observability/.env.example ./infra/observability/.env
```

Запустите стек:

```bash
docker compose -f ./infra/observability/compose.observability.yaml up -d
```

Остановить стек:

```bash
docker compose -f ./infra/observability/compose.observability.yaml down
```

Проверить статус контейнеров:

```bash
docker compose -f ./infra/observability/compose.observability.yaml ps
```

## Адреса

- Grafana: `http://localhost:3010`
- Loki: `http://localhost:3100`
- Tempo: `http://localhost:3200`
- Alloy UI: `http://localhost:12345`
- Faro endpoint: `http://localhost:12347/collect`

Логин Grafana по умолчанию: `admin` / `admin`.

Порты и credentials можно переопределить в `infra/observability/.env`.

## Дашборды

Grafana автоматически подхватывает provisioned dashboards из `infra/observability/grafana/dashboards`.

Основные дашборды:

- `Task Tracker / Frontend`
- `Task Tracker / Frontend Traces (Tempo)`

Если в Grafana пустой список дашбордов, проверьте, что стек поднят командой из корня репозитория. Это важно для корректных bind mounts из `infra/observability/grafana/*`.
