import logger from '@utils/logger/winston/logger';
import httpMsg from '@utils/http_messages/http_msg';
import config from '@config/app';

const lblErr = 'Root error';

export default async () => {
    try {
        const baseApiUrl = config.api.prefix;
        const route = '/' + baseApiUrl + '/info';

        return httpMsg.http200(route);
    } catch (err: any) /* istanbul ignore next */ {
        logger.error(`Erro ao redicionar a url. ${err.message}`);
        return httpMsg.http422('Erro ao tentar redirecionar.', lblErr);
    }
};
