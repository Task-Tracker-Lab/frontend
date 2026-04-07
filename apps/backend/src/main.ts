import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import { env } from './env';
import { TransformResponseInterceptor } from './shared/interceptors';
import { corsConfig } from './config/cors.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const PORT = Number(env.PORT);
  if (Number.isNaN(PORT)) {
    throw new Error('Не задан порт в .env');
  }

  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, {
    rawBody: true,
  });

  await app.register(fastifyCookie);
  await app.register(fastifyCompress, {
    global: false,
    encodings: ['gzip', 'br'],
    threshold: 1024,
  });

  await app.getHttpAdapter().getInstance().register(fastifyCors, corsConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.setGlobalPrefix('api/v1', {
    exclude: ['/'],
  });
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  setupSwagger(app);

  await app.listen(PORT, '0.0.0.0', () =>
    console.log(`\x1b[34mServer started on port = ${PORT}\x1b[0m`)
  );
}

bootstrap();
