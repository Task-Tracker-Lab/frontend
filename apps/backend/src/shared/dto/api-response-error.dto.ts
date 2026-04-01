import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Invalid value' })
  message: string | string[];

  @ApiProperty({ example: 'BAD_REQUEST' })
  error: string;

  @ApiProperty({ example: '2026-03-31T14:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/v1/users/me' })
  path: string;
}
