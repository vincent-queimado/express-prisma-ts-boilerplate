import prisma from '../../../prisma/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default async (id: string, data: any) => {
    const where = { id };

    const result = await prisma.user
        .update({
            where,
            data,
        })
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => /* istanbul ignore next */ {
            logger.error(`Failed to update account. DB Error: ${error}`);
            return { success: false, data: null, error: 'DB_QUERY_ERROR' };
        });

    return result;
};
