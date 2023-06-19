import { Request, Response, NextFunction } from 'express';
import pkg from '@packagejson';
import presenter from '@services/commons/logs_infos';
import logger from '@utils/logger/winston/logger';

const listar = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .listar()
        .then((result: any) => {
            try {
                res.render('logs/logs_view', {
                    title: `Logs de Api ${pkg.name.toUpperCase()}`,
                    logsInfo: result.logsInfo,
                    logsError: result.logsError,
                });
            } catch (err: any) {
                logger.error(`Erro ao listar os arquivos de logs de API. ${err.message}`);
            }
        })
        .catch((err: any) => next(err));
};

export default {
    listar,
};
