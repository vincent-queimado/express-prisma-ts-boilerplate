import prisma from '../../../prisma/prisma-client';
import logger from '@utils/logger/winston/logger';

const msgError = 'Failed to delete a user.';

export default async (email: string) => {
    const where = { email };

    const result = await prisma.user
        .delete({ where })
        .then((data: any) => ({ success: true, data, error: null }))
        .catch((error: any) => /* istanbul ignore next */ {
            logger.error(`${msgError} ${error}`);
            return { success: false, data: null, error: msgError };
        });

    return result;
};
