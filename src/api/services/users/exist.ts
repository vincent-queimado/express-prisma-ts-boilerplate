import User from '../../models/users';
import logger from '../../../utils/winston_file_logger/winston/logger';

export default (id: number) => {
    const result = User.findByPk(id)
        .then((res: any) => ({ success: true, data: res, error: null }))
        .catch((error: any) => {
            logger.error(`Failed to find account. DB Error: ${error}`);
            return { success: false, data: null, error: 'Failed to find account.' };
        });

    return result;
};
