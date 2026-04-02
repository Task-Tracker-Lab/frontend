import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponse, ApiResponsePaginated } from '../shared/dto';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Task Tracker API')
    .setDescription('API documentation for Task Tracker')
    .setVersion('1.0')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      description: 'JWT token in HttpOnly cookie',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ApiResponse, ApiResponsePaginated],
  });

  SwaggerModule.setup('doc', app, document);
}
