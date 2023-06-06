import { Router } from 'express';

import Auth from '@middlewares/jwt_auth/auth';
import CtrlUserAuth from '@controllers/client/users_auth_controller';

import { register, login } from '@schemas/auth_schema';
import { validateSchema } from '@middlewares/validate_schema/validade_schema';

const router = Router();

// User Register
router.post('/register', validateSchema(register), CtrlUserAuth.register);
router.get('/register/confirmation', CtrlUserAuth.registerConfirm);

// User Login/Logout
router.post('/login', validateSchema(login), CtrlUserAuth.login);
router.get('/logout', Auth.jwtUsers, CtrlUserAuth.logout);

// User Forgot Password
router.post('/forgotpassword/request', CtrlUserAuth.forgotPasswordRequest);
router.post('/forgotpassword/reset', CtrlUserAuth.forgotPasswordReset);

export default router;
