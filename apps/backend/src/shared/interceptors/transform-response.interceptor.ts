import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../dto';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((result) => {
        if (result == null) {
          return { data: null };
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
