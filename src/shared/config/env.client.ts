import { z } from 'zod/v4';

export const envSchemaClient = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url('NEXT_PUBLIC_API_BASE_URL должен быть валидным URL'),
  NEXT_PUBLIC_FARO_URL: z.url(
    'NEXT_PUBLIC_FARO_URL должен быть валидным URL (например, http://alloy:12347/collect)'
  ),
  NEXT_PUBLIC_FARO_APP_NAME: z
    .string({
      error: 'Имя приложения для Faro обязательно',
    })
    .min(1, 'Имя приложения не может быть пустым'),
  NEXT_PUBLIC_FARO_APP_NAMESPACE: z
    .string({
      error: 'Namespace приложения обязателен',
    })
    .min(1, 'Namespace не может быть пустым'),
  NEXT_PUBLIC_FARO_APP_VERSION: z.string().default('1.0.0'),
  NEXT_PUBLIC_APP_ENV: z
    .string({
      error: 'Окружение (APP_ENV) обязательно',
    })
    .min(1, 'Окружение не может быть пустым'),
  NEXT_PUBLIC_METRICS_ENABLED: z
    .enum(['true', 'false'], {
      error: 'NEXT_PUBLIC_METRICS_ENABLED - обязателен',
    })
    .transform((v) => v === 'true'),
});

const _env = envSchemaClient.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_FARO_URL: process.env.NEXT_PUBLIC_FARO_URL,
  NEXT_PUBLIC_FARO_APP_NAME: process.env.NEXT_PUBLIC_FARO_APP_NAME,
  NEXT_PUBLIC_FARO_APP_NAMESPACE: process.env.NEXT_PUBLIC_FARO_APP_NAMESPACE,
  NEXT_PUBLIC_FARO_APP_VERSION: process.env.NEXT_PUBLIC_FARO_APP_VERSION,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_METRICS_ENABLED: process.env.NEXT_PUBLIC_METRICS_ENABLED,
});

if (!_env.success) {
  console.error('❌ [ENV VALIDATION ERROR]:', z.treeifyError(_env.error).properties);
  if (typeof window === 'undefined') {
    throw new Error('Client env validation failed on server-side rendering');
  }
}

export type ClientEnv = z.infer<typeof envSchemaClient>;

export const env: ClientEnv = _env.success ? _env.data : ({} as ClientEnv);
