import { Router } from 'express';
import defaultRoute from './default_route';
import infoRoute from '@routes/commons/infos/info_route';
import logsRoute from '@routes/commons/logs/logs_route';
import docsRoute from '@routes/commons/docs/docs_route';
import emailsRoute from '@routes/commons/templates/emails_route';
import smsRoute from '@routes/commons/templates/sms_route';
import config from '@config/app';

const router = Router();

const defaultRoutes = [
    {
        path: '/',
        route: defaultRoute,
    },
    {
        path: '/info',
        route: infoRoute,
    },
    {
        path: '/logs',
        route: logsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

const devRoutes = [
    {
        path: '/docs',
        route: docsRoute,
    },
    {
        path: '/templates/email',
        route: emailsRoute,
    },
    {
        path: '/templates/sms',
        route: smsRoute,
    },
];

if (!config.isProd) {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
