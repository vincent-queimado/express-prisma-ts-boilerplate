import { Request, Response, NextFunction } from 'express';
import presenter from '@presenters/cliente/user_me';
import logger from '@utils/winston_file_logger/winston/logger';

const showMe = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .showMe(req.body.user.id)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Erro de visualização de dados de usuário. ${err.message}`);
            next(err);
        });
};

const updateMe = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .updateMe(req.body.user.id, req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Erro de atualização de dados de usuário. ${err.message}`);
            next(err);
        });
};

const deleteMe = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .deleteMe(req.body.user.id)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Erro de exclusão de dados de usuário. ${err.message}`);
            next(err);
        });
};

export default {
    showMe,
    updateMe,
    deleteMe,
};