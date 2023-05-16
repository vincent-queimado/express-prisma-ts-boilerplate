import prisma from '@pri/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default async (id: string, data: any) => {
    const result = await prisma.user
        .update({
            where: { id },
            data,
        })
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to update account. DB Validation Error: ${error.message}`);

            if (error.errors[0].type === 'unique violation') {
                return { success: false, data: null, error: 'ACCOUNT_ALREADY_EXIST' };
            }
            return { success: false, data: null, error: 'DB_VALIDATION_ERROR' };
        })
        .catch((error: any) => {
            logger.error(`Failed to update account. DB Error: ${error}`);
            return { success: false, data: null, error: 'DB_QUERY_ERROR' };
        });

    return result;
};
