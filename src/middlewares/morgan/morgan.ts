import morgan, { StreamOptions } from 'morgan';

import config from '@config/app';
import logger from '@utils/logger/winston/logger';

const stream: StreamOptions = {
    write: (message) => logger.info(message.trim()),
};

const skip = () => {
    return !config.debug.http_request;
};

const consoleLogger = morgan('dev');

const fileLogger = morgan(
    'HTTP request from :remote-addr :method :url :status :res[content-length] - :response-time ms',
    { stream, skip },
);

export default {
    consoleLogger,
    fileLogger,
};
