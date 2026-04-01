import { Prisma } from '@prisma/client';

export const publicUserSelect = {
  id: true,
  name: true,
} satisfies Prisma.UserSelect;

export const privateUserSelect = {
  ...publicUserSelect,
  email: true,
  role: true,
} satisfies Prisma.UserSelect;

export type PrivateUserPayload = Prisma.UserGetPayload<{ select: typeof privateUserSelect }>;
export type PublicUserPayload = Prisma.UserGetPayload<{ select: typeof publicUserSelect }>;
