import { Response, Request } from 'express';
import presenter from '../presenters/users/_index';
import logger from '../../utils/winston_file_logger/winston/logger';

const showMe = (req: Request, res: Response, next: any) => {
    presenter
        .showMe(req.user.id)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de visualização de dados de usuário. ${err.message}`);
            next(err);
        });
};

const updateMe = (req: Request, res: Response, next: any) => {
    presenter
        .updateMe(req.user.id, req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de atualização de dados de usuário. ${err.message}`);
            next(err);
        });
};

const deleteMe = (req: Request, res: Response, next: any) => {
    presenter
        .deleteMe(req.user.id)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de exclusão de dados de usuário. ${err.message}`);
            next(err);
        });
};

export default {
    showMe,
    updateMe,
    deleteMe,
};
