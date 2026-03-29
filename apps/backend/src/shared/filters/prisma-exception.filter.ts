import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal database error';

    switch (exception.code) {
      case 'P2002':
        // Unique constraint
        status = HttpStatus.CONFLICT;
        message = 'Record already exist';
        break;
      case 'P2025': // Record is not found for create/update/delete
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      case 'P2003': // Foreign key constraint
        status = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed';
        break;
      case 'P2000': {
        // Value too long
        status = HttpStatus.BAD_REQUEST;
        const column = exception.meta?.column_name
          ? String(exception.meta.column_name)
          : 'UNKNOWN_FIELD';
        message = `The provided value is too long for a field "${column}"`;
        break;
      }
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `[${request.method}] ${request.url} - Prisma Error ${exception.code}`,
        exception.stack
      );
    } else {
      this.logger.warn(
        `[${request.method}] ${request.url} - Client Error (Prisma ${exception.code}): ${message}`
      );
    }

    const responseBody = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    httpAdapter.reply(response, responseBody, status);
  }
}
