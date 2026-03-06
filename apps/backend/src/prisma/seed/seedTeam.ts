import { type PrismaClient, TeamMemberRole } from '@prisma/client';

export async function seedTeam(prisma: PrismaClient, ownerId: string) {
    return prisma.$transaction(async (tx) => {
        const team = await tx.team.create({
            data: {
                name: 'Test Team',
                ownerId,
            },
        });

        await tx.teamMember.create({
            data: {
                userId: ownerId,
                teamId: team.id,
                role: TeamMemberRole.OWNER,
            },
        });

        return team;
    });
}
