import type { UserRole } from '@prisma/client';
import { PrivateUserPayload, PublicUserPayload } from '../selectors/user.selectors';

export class PrivateUserDto implements PrivateUserPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export class PublicUserDto implements PublicUserPayload {
  id: string;
  name: string;
}
