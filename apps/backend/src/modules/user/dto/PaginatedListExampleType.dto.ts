import { ApiProperty } from '@nestjs/swagger';

export class PaginatedListExampleType {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Ivan' })
  name: string;
}
