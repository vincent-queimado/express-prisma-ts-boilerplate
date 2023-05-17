import prisma from '@pri/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default async (id: string) => {
    const result = await prisma.user
        .update({
            where: { id },
            data: { deleted: true },
        })
        .then((data: any) => ({ success: true, data, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to delete account. DB Error: ${error}`);
            return { success: false, data: null, error: 'DB_QUERY_ERROR' };
        });

    return result;
};
