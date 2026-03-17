import { type PrismaClient } from '@prisma/client';

export async function seedTaskComments(
  prisma: PrismaClient,
  tasks: { id: string }[],
  teamMemberId: string
) {
  const comments = [];

  for (const task of tasks) {
    const comment = await prisma.taskComment.create({
      data: {
        text: `Comment for task ${task.id}`,
        taskId: task.id,
        teamMemberId,
      },
    });

    comments.push(comment);
  }

  return comments;
}
