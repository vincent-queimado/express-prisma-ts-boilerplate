import { Request, Response, NextFunction } from 'express';
import presenter from '@services/client/user_me';
import logger from '@utils/logger/winston/logger';

const showAll = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .showAll()
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Erro de listagem de usuários. ${err.message}`);
            next(err);
        });
};

export default {
    showAll,
};
