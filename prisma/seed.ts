import { PrismaClient } from '@/lib/generated/prisma';

export const prisma = new PrismaClient

async function main() {
    await prisma.user.createMany({
        data: [

        ]
    })
}
main().catch((e) => {
    throw e
})
    .finally(async () => {
        await prisma.$disconnect()
    })