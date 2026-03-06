import { PrismaClient } from '@prisma/client';
import { seedTeamMembers } from './seedTeamMembers';
import { seedTeam } from './seedTeam';
import { seedUsers } from './seedUsers';
import { seedProjects } from './seedTeamProjects';
import { seedBoards } from './seedBoards';
import { seedBoardStatusesAndColumns } from './seedBoardColumns';
import { seedTasks } from './seedTasks';
import { seedTaskComments } from './seedTaskComments';
import { seedTaskHistory } from './seedTaskHistory';

const prisma = new PrismaClient();

async function up() {
    const users = await seedUsers(prisma);

    const team = await seedTeam(prisma, users.userTest1.id);

    const { teamMemberAdmin, teamMember } = await seedTeamMembers(
        prisma,
        team.id,
        users.userTest2.id,
        users.userTest3.id
    );

    const { project1, project2 } = await seedProjects(prisma, team.id);

    const boards = await seedBoards(prisma, project1.id, project2.id);

    for (const board of boards) {
        const statuses = await seedBoardStatusesAndColumns(prisma, board.id);

        const tasks = await seedTasks(
            prisma,
            board.id,
            statuses,
            teamMemberAdmin.id,
            teamMember.id
        );

        await seedTaskComments(prisma, tasks, teamMember.id);

        await seedTaskHistory(prisma, tasks, teamMemberAdmin.id);
    }
}

async function down() {
    await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "TaskComment",
      "TaskHistory",
      "Task",
      "BoardColumn",
      "TaskStatus",
      "Board",
      "Project",
      "TeamMember",
      "Team",
      "User"
    RESTART IDENTITY CASCADE
  `);
}

async function main() {
    try {
        await down();
        await up();
        console.log();
    } catch (e) {
        console.log(e);
    }
}

main()
    .catch(async (e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        prisma.$disconnect();
    });
