import { Router } from 'express';
import defaultRoute from './default.route';
import userAuthRoute from './user_auth.route';
import userMeRoute from './user_me.route';
import usersRoute from './users.route';
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

if (config.isDev || config.isTest) {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
