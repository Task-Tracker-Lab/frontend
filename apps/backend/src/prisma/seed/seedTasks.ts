import { type PrismaClient, TaskPriority, TaskType } from '@prisma/client';

export async function seedTasks(
  prisma: PrismaClient,
  boardId: string,
  statuses: { id: string }[],
  creatorId: string,
  assigneeId: string
) {
  const tasks = [];
  const priorities = Object.values(TaskPriority);
  const types = Object.values(TaskType);

  for (let i = 1; i <= 10; i++) {
    const status = statuses[i % statuses.length];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const task = await prisma.task.create({
      data: {
        title: `Task ${i}`,
        description: `Description for task ${i}`,
        type: randomType,
        priority: randomPriority,
        boardId,
        statusId: status.id,
        createdById: creatorId,
        assignedToId: assigneeId,
      },
    });

    tasks.push(task);

    const shouldCreateSubtasks = Math.random() < 0.3;

    if (shouldCreateSubtasks) {
      const subtasksCount = Math.random() < 0.5 ? 1 : 2;

      for (let j = 1; j <= subtasksCount; j++) {
        const subPriority = priorities[Math.floor(Math.random() * priorities.length)];
        const subType = types[Math.floor(Math.random() * types.length)];
        const subStatus = statuses[Math.floor(Math.random() * statuses.length)];

        const subtask = await prisma.task.create({
          data: {
            title: `Task ${i}.${j}`,
            description: `Subtask ${j} for task ${i}`,
            type: subType,
            priority: subPriority,
            boardId,
            statusId: subStatus.id,
            createdById: creatorId,
            assignedToId: assigneeId,
            parentId: task.id,
          },
        });

        tasks.push(subtask);
      }
    }
  }

  return tasks;
}
