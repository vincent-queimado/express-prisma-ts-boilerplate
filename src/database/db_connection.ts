import colorTxt from 'ansi-colors';
import { PrismaClient } from '@prisma/client';
import logger from '@utils/winston_file_logger/winston/logger';

const prisma = new PrismaClient();

const checkConnection = async () => {
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
