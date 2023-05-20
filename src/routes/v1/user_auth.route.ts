import { Router } from 'express';

import CtrlUserAuth from '@controllers/users_auth.controller';

const router = Router();

// User Register
router.post('/register', CtrlUserAuth.register);
router.get('/register/confirmation', CtrlUserAuth.registerConfirm);

// User Login/Logout
router.post('/auth/login', CtrlUserAuth.login);
router.post('/auth/logout', CtrlUserAuth.logout);

// User Forgot Password
// router.post('/forgotpassword/request', CtrlUserAuth.forgotPasswordRequest);
// router.post('/forgotpassword/reset', CtrlUserAuth.forgotPasswordReset);

export default router;
