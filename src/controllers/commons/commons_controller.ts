import { Request, Response, NextFunction } from 'express';
import presenter from '@services/commons';
import logger from '@utils/logger/winston/logger';

const root = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .apiRoot()
        .then((result: any) => {
            try {
                res.redirect(result.data.content);
            } catch (err: any) /* istanbul ignore next */ {
                logger.error(`Erro ao redirecionar rota para raiz de url. ${err.message}`);
            }
        })
        .catch(/* istanbul ignore next */ (err: any) => next(err));
};

const info = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .apiInfo()
        .then((result: any) => {
            try {
                res.status(result.httpStatusCode).json(result.data);
            } catch (err: any) /* istanbul ignore next */ {
                logger.error(`Erro ao apresentar informações de API. ${err.message}`);
            }
        })
        .catch(/* istanbul ignore next */ (err: any) => next(err));
};

export default {
    root,
    info,
};
