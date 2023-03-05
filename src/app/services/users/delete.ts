import Sequelize from 'sequelize';

import db from '../../../database/models/_index';
import logger from '../../../utils/winston_file_logger/winston/logger';

export default async (id: number) => {
    const result = await db.user
        .update(
            { deleted: true },
            {
                where: { id },
                returning: true,
            },
        )
        .then((data: any) => ({ success: true, data, error: null }))
        .catch(Sequelize.ValidationError, (error: any) => {
            logger.error(
                `Failed to delete account. DB Validation Error: ${error.errors[0].message}`,
            );
            if (error.errors[0].type === 'unique violation') {
                return { success: false, data: null, error: 'ACCOUNT_ALREADY_EXIST' };
            }
            return { success: false, data: null, error: 'DB_VALIDATION_ERROR' };
        })
        .catch((error: any) => {
            logger.error(`Failed to delete account. DB Error: ${error}`);
            return { success: false, data: null, error: 'DB_QUERY_ERROR' };
        });

    return result;
};
