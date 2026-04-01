import { IsString } from 'class-validator';

export class UpdateAuthUserPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
