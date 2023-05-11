import prisma from '@prisma/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default async (id: string) => {
    const result = await prisma.user
        .update(
            { deleted: true },
            {
                where: { id },
                returning: true,
            },
        )
        .then((data: any) => ({ success: true, data, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to delete account. DB Validation Error: ${error.message}`);
            if (error.errors[0].type === 'unique violation') {
                return { success: false, data: null, error: 'ACCOUNT_ALREADY_EXIST' };
            }
            return { success: false, data: null, error: 'DB_VALIDATION_ERROR' };
        })
        .catch((error: any) => {
            logger.error(`Failed to delete account. DB Error: ${error}`);
            return { success: false, data: null, error: 'DB_QUERY_ERROR' };
        });

    return result;
};
