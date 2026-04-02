import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { DomainError } from '../errors';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiErrorResponseDto } from '../dto';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: DomainError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'NOT_FOUND':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'CONFLICT':
        status = HttpStatus.CONFLICT;
        break;
      case 'BAD_REQUEST':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'FORBIDDEN':
        status = HttpStatus.FORBIDDEN;
        break;
      case 'UNAUTHORIZED':
        status = HttpStatus.UNAUTHORIZED;
        break;
    }

    const responseBody: ApiErrorResponseDto = {
      statusCode: status,
      message: exception.message,
      error: exception.code.replace(/\s+/g, '_').toUpperCase(),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    httpAdapter.reply(response, responseBody, status);
  }
}
