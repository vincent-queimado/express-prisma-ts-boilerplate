import { Router } from 'express';
import defaultRoute from './default_route';
import infoRoute from '@routes/commons/info_route';
import logsRoute from '@routes/commons/logs_route';
import docsRoute from '@routes/commons/docs_route';
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
];

if (!config.isProd) {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
