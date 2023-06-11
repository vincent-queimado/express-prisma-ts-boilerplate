import logger from '@utils/winston_file_logger/winston/logger';
import httpMsg from '@utils/http_messages/http_msg';
import apiInfo from '@dao/commons/api_info_service';

const lblErr = 'API Info error';

export default async () => {
    try {
        const result = await apiInfo();

        /* istanbul ignore if */
        if (!result.success || !result.data)
            return httpMsg.http422('Erro ao carregar informações', lblErr);

        return httpMsg.http200(result.data);
    } catch (err: any) /* istanbul ignore next */ {
        logger.error(`Erro ao carregar informações de API. ${err.message}`);
        return httpMsg.http422('Erro ao carregar informações', lblErr);
    }
};
