import type { PrismaClient } from '@prisma/client';

export async function seedProjects(prisma: PrismaClient, teamId: string) {
  const project1 = await prisma.project.create({
    data: {
      name: 'Desktop App',
      teamId,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Mobile App',
      teamId,
    },
  });

  return { project1, project2 };
}
