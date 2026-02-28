import { PrismaClient } from '@prisma/client'
import { usersForSeed } from './seed-constants'
import { hashPassword } from '../../user/utils/hashPassword/hashPassword'

const prisma = new PrismaClient()

async function up() {
    // create users with different roles
    for (const user of usersForSeed) {
        const hashedPassword = await hashPassword(user.password)
        await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        })
    }
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down()
        await up()
        console.log()
    } catch (e) {
        console.log(e)
    }
}

main()
    .catch(async (e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        prisma.$disconnect()
    })
