import prisma from '../../../prisma/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default (data: string, dataBy: string, fields: any, findDeleted: boolean) => {
    const buildQuery = (
        data: string,
        dataBy: string,
        findDeleted: boolean,
    ) => /* istanbul ignore next */ {
        if (dataBy === 'id') {
            if (findDeleted) {
                return { id: data };
            } else {
                return { id: data, isDeleted: false };
            }
        } else if (dataBy === 'email') {
            if (findDeleted) {
                return { email: data };
            } else {
                return { email: data, isDeleted: false };
            }
        }
    };

    const where = buildQuery(data, dataBy, findDeleted);
    const select = fields;

    const result = prisma.user
        .findFirst({ where, select })
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => /* istanbul ignore next */ {
            logger.error(`Failed to find account. DB Error: ${error}`);
            return { success: false, data: null, error: 'Failed to find account.' };
        });

    return result;
};
