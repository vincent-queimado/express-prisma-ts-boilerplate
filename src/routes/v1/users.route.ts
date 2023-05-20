import { Router } from 'express';

import Auth from '@middlewares/jwt_auth/auth';

import CtrlUsers from '@controllers/users.controller';

const router = Router();

// List of All Users
router.get('/', CtrlUsers.showAll);

export default router;
