import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';

import xss from '@middlewares/xss/xss';
import rateLimit from '@middlewares/rate_limiter/rate_limiter';

import routes from '@routes/default';
import apiRoutesV1 from '@routes/v1/routes';

import morgan from '@middlewares/morgan/morgan';
import handleError from '@middlewares/http_error_handler/error_handler';

const jsonLimit = '5mb';
const publicLogs = './logs';
const publicFavicon = './public/assets/images/favicons/favicon.ico';

export default () => {
    const app = express();

    app.use(helmet());

    app.use(xss());

    app.use(cors());

    app.use(rateLimit.limiter);

    app.use(morgan.consoleLogger);
    app.use(morgan.fileLogger);

    app.use(favicon(publicFavicon));

    app.use(bodyParser.json({ limit: jsonLimit }));
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/logs', express.static(publicLogs, { dotfiles: 'allow' }));

    app.use('/', routes);
    app.use('/api/v1/', apiRoutesV1);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../api/views'));

    app.get('*', (req: Request, res: Response, next: NextFunction) => {
        next();
    });

    app.use(handleError);

    return app;
};
