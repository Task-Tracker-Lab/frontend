import { UserRole } from '@prisma/client';

export const usersForSeed = [
  {
    name: 'testUser',
    email: 'testUser@gmail.com',
    password: 'testUser',
    // role: USER - default role
  },
  {
    name: 'testAdmin',
    email: 'testAdmin@gmail.com',
    password: 'testAdmin',
    role: UserRole.ADMIN,
  },
  {
    name: 'testModerator',
    email: 'testModeartor@gmail.com',
    password: 'testModerator',
    role: UserRole.MODERATOR,
  },
];
