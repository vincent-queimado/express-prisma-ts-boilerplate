import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';

import routes from '@routes/default';
import apiRoutes from '@routes/routes';

import morganMiddleware from '@middlewares/morgan_logger/morgan_middleware';
import handleError from '@middlewares/http_error_handler/error_handler';

const jsonLimit = '5mb';
const publicLogs = './logs';
const publicFavicon = './public/assets/images/favicons/favicon.ico';

export default () => {
    const app = express();

    app.use(helmet());

    app.use(cors());

    app.use(morganMiddleware.morganConsoleLogger);
    app.use(morganMiddleware.morganFileLogger);

    app.use(favicon(publicFavicon));

    app.use(bodyParser.json({ limit: jsonLimit }));
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/logs', express.static(publicLogs, { dotfiles: 'allow' }));

    app.use('/', routes);
    app.use('/api/v1/', apiRoutes);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../api/views'));

    app.get('*', (req, res, next) => {
        next();
    });

    app.use(handleError);

    return app;
};
