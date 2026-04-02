import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty()
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class ApiMeta {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export class ApiResponsePaginated<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty()
  meta: ApiMeta;

  constructor(data: T[], meta: ApiMeta) {
    this.data = data;
    this.meta = meta;
  }
}
