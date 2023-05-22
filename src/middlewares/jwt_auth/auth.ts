import { Request, Response, NextFunction } from 'express';

import presenter from './jwt';
import logger from '@utils/winston_file_logger/winston/logger';

const jwtUsers = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .jwtUsers(req)
        .then((result: any) => {
            if (!result.success) {
                res.status(result.httpStatusCode).json(result.data);
            } else {
                req.body.user = result.data;
                next();
            }
        })
        .catch((err: any) => /* istanbul ignore next */ {
            logger.error(`JWT Auth error: ${err})`);
            next(err);
        });
};

export default {
    jwtUsers,
};
