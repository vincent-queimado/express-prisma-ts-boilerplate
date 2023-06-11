import { Router } from 'express';
import userAuthRoute from './user_auth_route';
import userMeRoute from './user_me_route';

const router = Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: userAuthRoute,
    },
    {
        path: '/user/me',
        route: userMeRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
