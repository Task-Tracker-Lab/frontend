import { type PrismaClient, TeamMemberRole } from '@prisma/client';

export async function seedTeamMembers(
  prisma: PrismaClient,
  teamId: string,
  userAdminId: string,
  userMemberId: string
) {
  const teamMemberAdmin = await prisma.teamMember.create({
    data: {
      userId: userAdminId,
      teamId,
      role: TeamMemberRole.ADMIN,
    },
  });

  const teamMember = await prisma.teamMember.create({
    data: {
      userId: userMemberId,
      teamId,
      role: TeamMemberRole.MEMBER,
    },
  });

  return { teamMemberAdmin, teamMember };
}
