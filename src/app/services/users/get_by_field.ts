import db from '../../../database/models/_index';
import logger from '../../../utils/winston_file_logger/winston/logger';

export default (data: any, dataBy: any, excludeFields: any, findDeleted: any) => {
    let options = {};

    if (dataBy === 'id') {
        if (findDeleted) {
            options = {
                where: { id: data },
                attributes: {
                    exclude: excludeFields,
                },
            };
        } else {
            options = {
                where: { id: data, deleted: false },
                attributes: {
                    exclude: excludeFields,
                },
            };
        }
    } else if (dataBy === 'email') {
        if (findDeleted) {
            options = {
                where: { email: data },
                attributes: {
                    exclude: excludeFields,
                },
            };
        } else {
            options = {
                where: { email: data, deleted: false },
                attributes: {
                    exclude: excludeFields,
                },
            };
        }
    } else {
        return { success: false, data: null, error: 'Failed to find account by field.' };
    }

    const result = db.user
        .findOne(options)
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to find account. DB Error: ${error}`);
            return { success: false, data: null, error: 'Failed to find account.' };
        });

    return result;
};
