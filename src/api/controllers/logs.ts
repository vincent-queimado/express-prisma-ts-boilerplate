import { Response, Request } from 'express';
import pkg from '@packagejson';
import presenter from '@presenters/logs/_index';
import logger from '@utils/winston_file_logger/winston/logger';

const listar = (req: Request, res: Response, next: any) => {
    presenter
        .listar()
        .then((result: any) => {
            try {
                res.render('logs', {
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
