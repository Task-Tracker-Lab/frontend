import type { UserRole } from '@prisma/client';
import { PrivateUserPayload, PublicUserPayload } from '../selectors/user.selectors';
import { ApiProperty } from '@nestjs/swagger';

export class PrivateUserDto implements PrivateUserPayload {
  @ApiProperty({ example: 'cmnc4mk5s0000uu54csfyvooh' })
  id: string;

  @ApiProperty({ example: 'Ivan' })
  name: string;

  @ApiProperty({ example: 'test@mail.com' })
  email: string;

  @ApiProperty({ example: 'USER' })
  role: UserRole;
}

export class PublicUserDto implements PublicUserPayload {
  @ApiProperty({ example: 'cmnc4mk5s0000uu54csfyvooh' })
  id: string;

  @ApiProperty({ example: 'Ivan' })
  name: string;
}
