import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';

import xss from '@middlewares/xss/xss';
import morgan from '@middlewares/morgan/morgan';
import rateLimit from '@middlewares/rate_limiter/rate_limiter';
import handleError from '@middlewares/http_error_handler/error_handler';
import {
    localUserStrategy,
    jwtUserStrategy,
} from '@middlewares/auth/passport_strategies/passportStrategy';

import config from '@config/app';
import routes from '@routes/index';
import routesUser from '@routes/client/v1';
import routesAdmin from '@routes/admin/v1';

const publicLogs = './logs';
const publicFavicon = './public/assets/images/favicons/favicon.ico';
const views = '../views';

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

    localUserStrategy(passport);
    jwtUserStrategy(passport);

    app.use(favicon(publicFavicon));
    app.use(express.static('public'));

    app.use(baseApiUrl + '/logs', express.static(publicLogs, { dotfiles: 'allow' }));
    app.use(baseApiUrl + '/', routes);
    app.use(baseApiUrl + '/client/', routesUser);
    app.use(baseApiUrl + '/admin/', routesAdmin);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, views));

    app.use(handleError);

    return app;
};
