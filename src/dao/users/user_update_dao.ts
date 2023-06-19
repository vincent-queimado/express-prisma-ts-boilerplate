import prisma from '../../../prisma/prisma-client';
import logger from '@utils/logger/winston/logger';

const msgError = 'Failed to update a user.';

export default async (id: string, data: any, select: object) => {
    const where = { id };

    const result = await prisma.user
        .update({
            where,
            data,
            select,
        })
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => /* istanbul ignore next */ {
            logger.error(`${msgError} ${error}`);
            return { success: false, data: null, error: msgError };
        });

    return result;
};
