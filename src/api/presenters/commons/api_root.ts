import logger from '@utils/winston_file_logger/winston/logger';
import httpMsg from '@utils/http_messages/http_msg';
import apiRoot from '@services/commons/api_root';

const lblErr = 'Root error';

export default async () => {
    try {
        const result = await apiRoot();

        if (!result.success || !result.data) return httpMsg.http422('Erro ao redirecionar', lblErr);

        return httpMsg.http200(result.data);
    } catch (err: any) {
        logger.error(`Erro ao redicionar a url. ${err.message}`);
        return httpMsg.http422('Erro ao tentar redirecionar.', lblErr);
    }
};
