import { z } from 'zod/v4';

const isServer = typeof window === 'undefined';
const isBuild = process.env.SKIP_ENV_VALIDATION === 'true';

const metricEnabledSchema = z.enum(['true', 'false'], {
  error: 'NEXT_PUBLIC_METRICS_ENABLED - обязателен',
});

const envSchemaServer = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'], {
      error: () => ({ message: 'NODE_ENV должен быть: development, production или test' }),
    })
    .default('development'),
  PORT: z.coerce
    .number()
    .min(1000, 'Порт не может быть ниже 1000')
    .max(65535, 'Неверный номер порта')
    .default(3000),
  OTEL_EXPORTER_OTLP_ENDPOINT: z
    .string({
      error: 'Эндпоинт OTLP обязателен',
    })
    .url('OTEL_EXPORTER_OTLP_ENDPOINT должен быть валидным URL (например, http://alloy:4318)'),
  OTEL_EXPORTER_OTLP_PROTOCOL: z.enum(['http/protobuf', 'http/json', 'grpc'], {
    error: () => ({ message: 'Протокол должен быть http/protobuf, http/json или grpc' }),
  }),
  OTEL_SERVICE_NAME: z
    .string({
      error: 'Имя OTEL сервиса обязательно',
    })
    .min(1, 'Имя сервиса не может быть пустым'),
  OTEL_RESOURCE_ATTRIBUTES: z
    .string({
      error: 'Атрибуты ресурсов (Resource Attributes) обязательны',
    })
    .includes('service.namespace=', { message: 'Атрибуты должны содержать service.namespace' }),
});

const envSchemaClient = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url('NEXT_PUBLIC_API_BASE_URL должен быть валидным URL'),
  NEXT_PUBLIC_FARO_URL: z
    .string({
      error: 'URL для Faro (Alloy) обязателен',
    })
    .url('NEXT_PUBLIC_FARO_URL должен быть валидным URL (например, http://alloy:12347/collect)'),
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
  NEXT_PUBLIC_METRICS_ENABLED:
    process.env.NODE_ENV === 'development'
      ? metricEnabledSchema.default('false').transform((v) => v === 'true')
      : metricEnabledSchema.transform((v) => v === 'true'),
});

const envSchema = envSchemaClient.extend(envSchemaServer.shape);

const getSchema = () => {
  if (!isServer) return envSchemaClient;

  if (isBuild) {
    return envSchemaClient.extend(envSchemaServer.partial().shape);
  }

  return envSchema;
};

const _env = getSchema().safeParse(process.env);

if (!_env.success) {
  if (isServer) {
    console.error('\n\x1b[1;31m[!] CONFIGURATION_ERROR\x1b[0m');

    _env.error.issues.forEach((issue) => {
      const path = issue.path.join('.') || 'root';
      console.error(` \x1b[31m> \x1b[0m \x1b[1m${path}\x1b[0m: \x1b[31m${issue.message}\x1b[0m`);
    });

    console.error('\n\x1b[33mHint:\x1b[0m Check your .env or Docker build-args\n');
    process.exit(1);
  } else {
    const styles: Record<string, string> = {
      badge:
        'background: #cc0000; color: white; font-family: monospace; font-weight: bold; padding: 2px 4px; border-radius: 2px;',
      text: 'color: #ff4444; font-family: monospace; font-weight: bold;',
    };

    console.group('%c ELIFECYCLE %c Command failed with exit code 1.', styles.badge, styles.text);

    _env.error.issues.forEach((issue) => {
      const path = issue.path.join('.') || 'root';
      console.error(
        `%cerror %c${path}: %c${issue.message}`,
        'color: #ff4444; font-weight: bold;',
        'color: white; font-weight: bold;',
        'color: #aaa;'
      );
    });

    console.groupEnd();

    throw new Error('Environment validation failed');
  }
} else {
  if (isServer) {
    if (isBuild) {
      console.log(
        '\x1b[33m  ⚠ SKIP \x1b[0m \x1b[90mServer-side validation skipped for Docker build\x1b[0m'
      );
    }

    console.log(
      '\n\x1b[42m\x1b[30m READY \x1b[0m \x1b[32mEnvironment variables validated successfully.\x1b[0m'
    );

    const entries = Object.entries(_env.data);
    const publicEnvs = entries.filter(([key]) => key.startsWith('NEXT_PUBLIC_'));
    const privateEnvs = entries.filter(([key]) => !key.startsWith('NEXT_PUBLIC_'));

    if (publicEnvs.length > 0) {
      console.log('\x1b[36m  ○ Client (Public):\x1b[0m');
      publicEnvs.forEach(([key, value]) => {
        console.log(
          `\x1b[32m    > \x1b[0m \x1b[90m${key.padEnd(30)}\x1b[0m : \x1b[1m${value}\x1b[0m`
        );
      });
    }

    if (privateEnvs.length > 0) {
      console.log('\x1b[35m  ○ Node (System):\x1b[0m');
      privateEnvs.forEach(([key, value]) => {
        console.log(
          `\x1b[32m    > \x1b[0m \x1b[90m${key.padEnd(30)}\x1b[0m : \x1b[1m${value}\x1b[0m`
        );
      });
    }
    console.log('');
  }
}

export type Env = z.infer<typeof envSchema>;
export const env = _env.data;
