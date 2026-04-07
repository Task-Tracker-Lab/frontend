import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthUserPasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: '654321' })
  @IsString()
  newPassword: string;
}
