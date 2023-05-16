import prisma from '@pri/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default () => {
    const result = prisma.user
        .findAll()
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to list accounts. DB Error: ${error}`);
            return { success: false, data: null, error: 'Failed to list accounts.' };
        });

    return result;
};
