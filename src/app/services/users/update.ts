import Sequelize from 'sequelize';

import db from '../../../database/models/_index';
import logger from '../../../utils/winston_file_logger/winston/logger';

export default async (id: number, data: any) => {
    const result = await db.user
        .update(data, {
            where: { id },
            // returning: true,
            // plain: true,
        })
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch(Sequelize.ValidationError, (error: any) => {
            logger.error(
                `Failed to update account. DB Validation Error: ${error.errors[0].message}`,
            );

            if (error.errors[0].type === 'unique violation') {
                return { success: false, data: null, error: 'ACCOUNT_ALREADY_EXIST' };
            }
            return { success: false, data: null, error: 'DB_VALIDATION_ERROR' };
        })
        .catch((error: any) => {
            logger.error(`Failed to update account. DB Error: ${error}`);
            return { success: false, data: null, error: 'DB_QUERY_ERROR' };
        });

    return result;
};
