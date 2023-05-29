import { Router } from 'express';

import CtrlUserAuth from '@controllers/client/users_auth_controller';
import Auth from '@middlewares/jwt_auth/auth';

const router = Router();

// User Register
router.post('/register', CtrlUserAuth.register);
router.get('/register/confirmation', CtrlUserAuth.registerConfirm);

// User Login/Logout
router.post('/login', CtrlUserAuth.login);
router.get('/logout', Auth.jwtUsers, CtrlUserAuth.logout);

// User Forgot Password
router.post('/forgotpassword/request', CtrlUserAuth.forgotPasswordRequest);
router.post('/forgotpassword/reset', CtrlUserAuth.forgotPasswordReset);

export default router;
