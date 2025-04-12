import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';

import xss from '@middlewares/xss/xss';
import morgan from '@middlewares/morgan/morgan';
import rateLimit from '@middlewares/rateLimiter/rateLimiter';
import handleError from '@middlewares/httpErrorHandler/errorHandler';


import { initResourceRoutes } from '../resources';



import config from '@config/app';


export default () => {
    const app = express();
    const baseApiUrl = '/' + config.api.prefix.replace('/', '');
    const corsOptions = { origin: config.cors.allowOrigin };

    app.use(helmet());

    app.use(cors(corsOptions));

    app.use(morgan.consoleLogger);
    app.use(morgan.fileLogger);

    app.use(bodyParser.json({ limit: config.api.jsonLimit }));
    app.use(bodyParser.urlencoded({ extended: config.api.extUrlencoded }));

    app.use(xss());
    app.use(rateLimit.limiter);

    app.use(baseApiUrl, ...initResourceRoutes())

    app.use(handleError);

    return app;
};
