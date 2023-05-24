import { Router } from 'express';

import Auth from '@middlewares/jwt_auth/auth';

import CtrlUserMe from '@controllers/admin/users_me_controller';

const router = Router();

// Manage User Profile
router.get('/', Auth.jwtUsers, CtrlUserMe.showMe);
router.patch('/', Auth.jwtUsers, CtrlUserMe.updateMe);
router.delete('/', Auth.jwtUsers, CtrlUserMe.deleteMe);

export default router;
