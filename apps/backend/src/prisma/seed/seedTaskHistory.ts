import { type PrismaClient } from '@prisma/client';

export async function seedTaskHistory(
  prisma: PrismaClient,
  tasks: { id: string }[],
  teamMemberId: string
) {
  for (const task of tasks) {
    await prisma.taskHistory.create({
      data: {
        field: 'title',
        oldValue: { status: 'todo' },
        newValue: { status: 'To do' },
        taskId: task.id,
        teamMemberId,
      },
    });
  }
}
