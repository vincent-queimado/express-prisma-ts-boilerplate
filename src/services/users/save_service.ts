import prisma from '@pri/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default (datas: any) => {
    const result = prisma.user
        .create(datas)
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to create account. DB Error: ${error.message}`);
            return { success: false, data: null, error: error.message };
        })
        .catch((error: any) => {
            logger.error(`Failed to create account. DB Error: ${error}`);
            return { success: false, data: null, error: 'Failed to create account.' };
        });

    return result;
};
