import { PrismaClient } from '@prisma/client';

const checkConnection = async () => {
    const prisma = new PrismaClient();

    const connection = await prisma
        .$connect()
        .then(() => {
            return { success: true, error: null };
        })
        .catch((err) => {
            return { success: false, error: err };
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
    return connection;
};

export default { checkConnection };
