import prisma from '../../../prisma/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

const msgError = 'Failed to get one user.';

export default (data: string, whereBy: string, select: object, findDeleted: boolean) => {
    const buildQuery = (
        data: string,
        whereBy: string,
        findDeleted: boolean,
    ) => /* istanbul ignore next */ {
        if (whereBy === 'id' && findDeleted) return { id: data };
        if (whereBy === 'id' && !findDeleted) return { id: data, isDeleted: false };
        if (whereBy === 'email' && findDeleted) return { email: data };
        if (whereBy === 'email' && !findDeleted) return { email: data, isDeleted: false };
    };

    const where = buildQuery(data, whereBy, findDeleted);

    const result = prisma.user
        .findFirst({ where, select })
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => /* istanbul ignore next */ {
            logger.error(`${msgError} ${error}`);
            return { success: false, data: null, error: msgError };
        });

    return result;
};
