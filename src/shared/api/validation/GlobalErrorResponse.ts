import { z } from 'zod';

//todo схема 400 и 409 отличается
export const GlobalErrorResponse = z.object({
  code: z
    .string()
    .describe('Уникальный бизнес-код ошибки (например, "INSUFFICIENT_FUNDS", "TEAM_NOT_FOUND")'),
  message: z.string().describe('Краткое описание ошибки для пользователя или разработчика'),
  retryable: z
    .boolean()
    .describe(
      'Флаг, указывающий клиенту, есть ли смысл повторять запрос без изменений (например, при 503 или Lock Timeout)'
    ),
  details: z
    .array(
      z
        .object({
          expected: z
            .string()
            .describe('Ожидаемый тип входного значения (например, "string", "number")'),
          message: z
            .string()
            .describe('Человекочитаемое сообщение о конкретной ошибке в этом поле'),
          code: z
            .string()
            .describe(
              'Машиночитаемый код ошибки валидации (например, "invalid_email", "too_short")'
            ),
          path: z
            .array(z.string())
            .describe('Путь к полю, где произошла ошибка (например, ["user", "email"])'),
        })
        .describe('Детальная информация о конкретном нарушении в запросе')
    )
    .optional()
    .describe('Список ошибок валидации (заполняется только для 400 ошибок)'),
  meta: z
    .object({
      requestId: z
        .string()
        .describe(
          'Уникальный ID запроса (Trace ID). Используется для поиска логов в Sentry/ELK/Kibana'
        ),
      timestamp: z.iso
        .datetime({})
        .describe('Точное время возникновения ошибки в формате ISO 8601'),
      path: z.string().describe('URL-путь эндпоинта, который вернул ошибку'),
      method: z.string().describe('HTTP метод запроса (GET, POST, etc.)'),
      service: z
        .string()
        .optional()
        .describe(
          'Имя микросервиса, в котором произошел сбой (полезно для будущего масштабирования)'
        ),
    })
    .describe('Техническая мета-информация для мониторинга и отладки'),
});

export type GlobalErrorResponseType = z.infer<typeof GlobalErrorResponse>;
