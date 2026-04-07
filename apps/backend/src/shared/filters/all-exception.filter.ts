import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiErrorResponseDto } from '../dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorCode = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as {
          message?: string | string[];
          error?: string;
        };

        message = responseObj.message ?? exception.message;
        errorCode = responseObj.error ?? exception.name;
      } else {
        message = exception.message;
        errorCode = exception.name;
      }
    } else if (exception instanceof Error) {
      this.logger.error(
        `[${request.method}] ${request.url} - ${exception.message}`,
        exception.stack
      );
      message = 'Internal server error. Please try again later.';
      errorCode = 'INTERNAL_SERVER_ERROR';
    }

    const responseBody: ApiErrorResponseDto = {
      statusCode: status,
      message: message,
      error: errorCode.replace(/\s+/g, '_').toUpperCase(),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    httpAdapter.reply(response, responseBody, status);
  }
}
