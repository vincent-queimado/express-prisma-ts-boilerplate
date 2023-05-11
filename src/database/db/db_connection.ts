import colorTxt from 'ansi-colors';
import { PrismaClient } from '@prisma/client';

import config from '@config/database/_index';
import logger from '@utils/winston_file_logger/winston/logger';

const prisma = new PrismaClient();

const checkConnection = async () => {
    await prisma
        .$connect()
        .then(() => {
            /* eslint-disable no-console */
            console.log(
                colorTxt.white(`-> Connected on database: ${config.host}:${config.port}`),
                /* eslint-enable no-console */
            );
            logger.info(`Database connection has been established successfully.`);
        })
        .catch((err) => {
            /* eslint-disable no-console */
            console.log(
                colorTxt.red(`-> Unable to connect to the database ${config.host}:${config.port}`),
            );
            /* eslint-enable no-console */
            logger.error(`Unable to connect to the database: ${err})`);
            throw err;
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
};

export default { checkConnection };
