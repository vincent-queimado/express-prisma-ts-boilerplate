import prisma from '@pri/prisma-client';
import logger from '@utils/winston_file_logger/winston/logger';

export default (data: string, dataBy: string, excludeFields: any, findDeleted: boolean) => {
    const buildQuery = (data: string, dataBy: string, excludeFields: any, findDeleted: boolean) => {
        if (dataBy === 'id') {
            if (findDeleted) {
                return { id: data };
            } else {
                return { id: data, deleted: false };
            }
        } else if (dataBy === 'email') {
            if (findDeleted) {
                return { email: data };
            } else {
                return { email: data, deleted: false };
            }
        }
    };

    const query = buildQuery(data, dataBy, excludeFields, findDeleted);
    console.log(query);

    const result = prisma.user
        .findFirst({
            where: query,
        })
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to find account. DB Error: ${error}`);
            return { success: false, data: null, error: 'Failed to find account.' };
        });

    return result;
};
