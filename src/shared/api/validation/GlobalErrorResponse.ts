import { z } from 'zod';

const ValidationIssueSchema = z
  .object({
    origin: z.string().optional(),
    code: z.string().describe('Машиночитаемый код ошибки валидации'),
    message: z.string().describe('Человекочитаемое сообщение об ошибке поля'),
    path: z.array(z.string()).describe('Путь к полю, где произошла ошибка'),
  })
  .catchall(z.unknown());

export const GlobalErrorResponse = z.object({
  success: z.boolean().describe('Признак успешного выполнения запроса'),
  error: z.object({
    code: z.string().describe('Уникальный бизнес-код ошибки'),
    message: z.string().describe('Краткое описание ошибки для пользователя или разработчика'),
    retryable: z
      .boolean()
      .describe(
        'Флаг, указывающий клиенту, есть ли смысл повторять запрос без изменений (например, при 503)'
      ),
  }),
  details: z
    .array(ValidationIssueSchema.describe('Детальная информация о конкретном нарушении в запросе'))
    .optional()
    .describe('Список ошибок валидации (заполняется только для 400 ошибок)'),
  meta: z
    .object({
      service: z.string().optional().describe('Имя микросервиса, в котором произошел сбой'),
      request: z
        .object({
          requestId: z.string().describe('Уникальный ID запроса (Trace ID)'),
          path: z.string().describe('URL-путь эндпоинта, который вернул ошибку'),
          method: z.string().describe('HTTP метод запроса (GET, POST, etc.)'),
          ip: z.string().optional().describe('IP-адрес клиента'),
        })
        .optional(),
      timestamp: z.iso
        .datetime({})
        .describe('Точное время возникновения ошибки в формате ISO 8601'),
      debug: z
        .object({
          stack: z.string().optional().describe('Стек вызовов для отладки'),
        })
        .optional(),
    })
    .catchall(z.unknown())
    .describe('Техническая мета-информация для мониторинга и отладки'),
});

export type GlobalErrorResponseType = z.infer<typeof GlobalErrorResponse>;
