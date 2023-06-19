import logger from '@utils/logger/winston/logger';
import httpMsg from '@utils/http_messages/http_msg';
import pkg from '@packagejson';

const lblErr = 'API Info error';

export default async () => {
    try {
        const data = {
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
        };

        return httpMsg.http200(data);
    } catch (err: any) /* istanbul ignore next */ {
        logger.error(`Erro ao carregar informações de API. ${err.message}`);
        return httpMsg.http422('Erro ao carregar informações', lblErr);
    }
};
