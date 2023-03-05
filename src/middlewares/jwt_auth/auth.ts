import presenter from './jwt/_index';
import logger from '../../utils/winston_file_logger/winston/logger';

// Auth validate token without checking user in database (not recommended)
const jwt = (req: any, res: any, next: any) => {
    presenter
        .jwt(req)
        .then((result: any) => {
            if (!result.success) {
                res.status(result.httpStatusCode).json(result.data);
            } else {
                req.user = result.data;
                next();
            }
        })
        .catch((err: any) => {
            logger.error(`JWT Auth error: ${err})`);
            next(err);
        });
};

// Auth validate token with checking if Storekeepers exist in database
const jwtUsers = (req: any, res: any, next: any) => {
    presenter
        .jwtUsers(req)
        .then((result: any) => {
            if (!result.success) {
                res.status(result.httpStatusCode).json(result.data);
            } else {
                req.user = result.data;
                next();
            }
        })
        .catch((err: any) => {
            logger.error(`JWT Auth error: ${err})`);
            next(err);
        });
};

export default {
    jwt,
    jwtUsers,
};
