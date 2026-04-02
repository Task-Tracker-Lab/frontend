import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../dto';
import { FastifyReply } from 'fastify';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    return next.handle().pipe(
      map((result) => {
        if (response.statusCode === 204) {
          return undefined;
        }
        if (result == null) {
          return {};
        }
        if (result.data) {
          return result;
        }
        if (result.items && result.total !== undefined) {
          const { items, ...meta } = result;
          return {
            data: items,
            meta: meta,
          };
        }
        return { data: result };
      })
    );
  }
}
