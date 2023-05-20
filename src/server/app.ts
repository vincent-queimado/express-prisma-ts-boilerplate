import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';

import xss from '@middlewares/xss/xss';
import morgan from '@middlewares/morgan/morgan';
import rateLimit from '@middlewares/rate_limiter/rate_limiter';
import handleError from '@middlewares/http_error_handler/error_handler';

import config from '@config/app';
import routesV1 from '@routes/v1';
import routes from '@routes/index';
import globalApiPath from '@utils/global_api_path/global_api_path';

const publicLogs = './logs';
const publicFavicon = './public/assets/images/favicons/favicon.ico';

export default () => {
    const app = express();
    const apiPath = globalApiPath();

    app.use(helmet());

    app.use(xss());

    app.use(cors());
    app.options('*', cors());

    app.use(morgan.consoleLogger);
    app.use(morgan.fileLogger);

    app.use(bodyParser.json({ limit: config.api.jsonLimit }));
    app.use(bodyParser.urlencoded({ extended: config.api.extUrlencoded }));

    app.use(favicon(publicFavicon));

    app.use(`/${apiPath}/logs`, express.static(publicLogs, { dotfiles: 'allow' }));

    // app.use(`${apiPath}/auth`, rateLimit.limiter);
    app.use(`${apiPath}/auth`, routesV1);

    app.use(`${apiPath}/`, routesV1);

    app.use('/', routes);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    app.use(handleError);

    return app;
};
