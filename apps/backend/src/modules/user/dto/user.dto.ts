import type { UserRole } from '@prisma/client';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
