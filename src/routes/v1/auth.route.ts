import { Router } from 'express';

import CtrlUserAuth from '@controllers/users_auth.controller';

const router = Router();

// User Register
router.post('/register', CtrlUserAuth.signup);
router.get('/register/confirmation', CtrlUserAuth.signupConfirm);

// User Login/Logout
router.post('/auth/login', CtrlUserAuth.signin);
router.post('/auth/logout', CtrlUserAuth.signout);

// User Forgot Password
// router.post('/forgotpassword/request', CtrlUserAuth.forgotPasswordRequest);
// router.post('/forgotpassword/reset', CtrlUserAuth.forgotPasswordReset);

export default router;
