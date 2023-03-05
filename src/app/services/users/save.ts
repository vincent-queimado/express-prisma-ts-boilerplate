import Sequelize from 'sequelize';

import db from '../../../database/models/_index';
import logger from '../../../utils/winston_file_logger/winston/logger';

export default (datas: any) => {
    const result = db.user
        .create(datas)
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch(Sequelize.ValidationError, (error: any) => {
            logger.error(`Failed to create account. DB Error: ${error.errors[0].message}`);
            return { success: false, data: null, error: error.errors[0].message };
        })
        .catch((error: any) => {
            logger.error(`Failed to create account. DB Error: ${error}`);
            return { success: false, data: null, error: 'Failed to create account.' };
        });

    return result;
};
