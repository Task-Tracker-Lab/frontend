import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../dto';

const ErrorDescriptions: Record<number, string> = {
  400: 'Bad Request',
  401: 'Not authorized',
  403: 'You have no access',
  404: 'Not found',
  409: 'Conflict',
  500: 'Internal server error',
};

export function ApiResponseHttpCodes(...codes: number[]) {
  const uniqueCodes = Array.from(new Set([...codes, 500]));

  const decorators = uniqueCodes.map((code) =>
    ApiResponse({
      status: code,
      description: ErrorDescriptions[code] || `Ошибка ${code}`,
      type: ApiErrorResponseDto,
    })
  );

  return applyDecorators(...decorators);
}
