import { Response, Request } from 'express';
import presenter from '@presenters/users/_index';
import logger from '@utils/winston_file_logger/winston/logger';

const showAll = (req: Request, res: Response, next: any) => {
    presenter
        .showAll()
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de listagem de usuários. ${err.message}`);
            next(err);
        });
};

export default {
    showAll,
};
