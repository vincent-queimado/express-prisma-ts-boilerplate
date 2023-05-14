import { Router } from 'express';
import defaultRoute from './default.route';
import authRoute from './auth.route';
import userRoute from './user.route';
import logsRoute from './logs.route';
import docsRoute from './docs.route';
import config from '@config/app';

const router = Router();

const defaultRoutes = [
    {
        path: '/',
        route: defaultRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/logs',
        route: logsRoute,
    },
];

const devRoutes = [
    {
        path: '/docs',
        route: docsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (config.isDev) {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
