import prisma from '../../../prisma/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

const msgError = 'User deletion service error. Failed to delete a user.';

export default async (id: string) => {
    const where = { id };
    const data = { isDeleted: true };

    const result = await prisma.user
        .update({
            where,
            data,
        })
        .then((data: any) => ({ success: true, data, error: null }))
        .catch((error: any) => /* istanbul ignore next */ {
            logger.error(`${msgError} ${error}`);
            return { success: false, data: null, error: `${msgError}` };
        });

    return result;
};
