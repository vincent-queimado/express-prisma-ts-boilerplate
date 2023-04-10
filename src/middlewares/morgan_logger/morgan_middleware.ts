import morgan, { StreamOptions } from 'morgan';

import config from '@config/app/_index';
import logger from '@utils/winston_file_logger/winston/logger';

const stream: StreamOptions = {
    write: (message) => logger.info(message.trim()),
};

const skip = () => {
    return !config.debug.http_request;
};

const morganConsoleLogger = morgan('dev');

const morganFileLogger = morgan(
    'HTTP request from :remote-addr :method :url :status :res[content-length] - :response-time ms',
    { stream, skip },
);

export default {
    morganConsoleLogger,
    morganFileLogger,
};
