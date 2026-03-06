import type { PrismaClient } from '@prisma/client';

export async function seedBoardStatusesAndColumns(prisma: PrismaClient, boardId: string) {
  return prisma.$transaction(async (tx) => {
    const statuses = [
      { name: 'Todo', position: 1 },
      { name: 'In Progress', position: 2 },
      { name: 'Done', position: 3 },
    ];

    const createdStatuses = [];

    for (const s of statuses) {
      const status = await tx.taskStatus.create({
        data: {
          name: s.name,
          boardId,
        },
      });

      await tx.boardColumn.create({
        data: {
          title: s.name,
          position: s.position,
          boardId,
          statusId: status.id,
        },
      });

      createdStatuses.push(status);
    }

    return createdStatuses;
  });
}
