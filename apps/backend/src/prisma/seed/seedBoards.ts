import type { PrismaClient } from '@prisma/client';

export async function seedBoards(prisma: PrismaClient, project1Id: string, project2Id: string) {
    const board1 = await prisma.board.create({
        data: {
            name: 'Frontend React',
            projectId: project1Id,
        },
    });

    const board2 = await prisma.board.create({
        data: {
            name: 'Backend Express',
            projectId: project1Id,
        },
    });

    const board3 = await prisma.board.create({
        data: {
            name: 'Frontend React Native',
            projectId: project2Id,
        },
    });

    const board4 = await prisma.board.create({
        data: {
            name: 'Backend NestJS',
            projectId: project2Id,
        },
    });

    return [board1, board2, board3, board4];
}
