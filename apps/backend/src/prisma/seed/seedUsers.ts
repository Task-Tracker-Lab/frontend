import { type PrismaClient, UserRole } from '@prisma/client';
import { hashPassword } from '../../modules/auth/utils/hashPassword/hashPassword';

export async function seedUsers(prisma: PrismaClient) {
    const userAdmin = await prisma.user.create({
        data: {
            name: 'testAdmin',
            email: 'testAdmin@gmail.com',
            password: await hashPassword('testAdmin'),
            role: UserRole.ADMIN,
        },
    });

    const userModerator = await prisma.user.create({
        data: {
            name: 'testModerator',
            email: 'testModerator@gmail.com',
            password: await hashPassword('testModerator'),
            role: UserRole.MODERATOR,
        },
    });

    const userTest1 = await prisma.user.create({
        data: {
            name: 'userTest1',
            email: 'userTest1@gmail.com',
            password: await hashPassword('userTest1'),
        },
    });

    const userTest2 = await prisma.user.create({
        data: {
            name: 'userTest2',
            email: 'userTest2@gmail.com',
            password: await hashPassword('userTest2'),
        },
    });

    const userTest3 = await prisma.user.create({
        data: {
            name: 'userTest3',
            email: 'userTest3@gmail.com',
            password: await hashPassword('userTest3'),
        },
    });

    return { userAdmin, userModerator, userTest1, userTest2, userTest3 };
}
