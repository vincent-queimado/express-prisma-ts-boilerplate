import { Response, Request } from 'express';
import presenter from '../presenters/commons/_index';
import logger from '../../utils/winston_file_logger/winston/logger';

const root = (req: Request, res: Response, next: any) => {
    presenter
        .apiRoot()
        .then((result: any) => {
            try {
                res.redirect(result.data.content);
            } catch (err: any) {
                logger.error(`Erro ao redirecionar rota para raiz de url. ${err.message}`);
            }
        })
        .catch((err: any) => next(err));
};

const info = (req: Request, res: Response, next: any) => {
    presenter
        .apiInfo()
        .then((result: any) => {
            try {
                res.status(result.httpStatusCode).json(result.data);
            } catch (err: any) {
                logger.error(`Erro ao apresentar informações de API. ${err.message}`);
            }
        })
        .catch((err: any) => next(err));
};

export default {
    root,
    info,
};