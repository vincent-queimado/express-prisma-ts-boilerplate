import { Router } from 'express';
import defaultRoute from './default_route';
import userAuthRoute from './user_auth_route';
import userMeRoute from './user_me_route';
import usersRoute from './users_route';
import logsRoute from './logs_route';
import docsRoute from './docs_route';
import config from '@config/app';

const router = Router();

const defaultRoutes = [
    {
        path: '/',
        route: defaultRoute,
    },
    {
        path: '/auth',
        route: userAuthRoute,
    },
    {
        path: '/user/me',
        route: userMeRoute,
    },
    {
        path: '/users',
        route: usersRoute,
    },
    {
        path: '/logs',
        route: logsRoute,
    },
    {
        path: '/docs',
        route: docsRoute,
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

if (!config.isProd) {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
