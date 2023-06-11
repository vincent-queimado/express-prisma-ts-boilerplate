import { Router } from 'express';

import auth from '@middlewares/auth/authenticate';
import ctrlUserAuth from '@controllers/client/users_auth_controller';

import { register, login, forgotPasswordRequest, registerConfirmation } from '@schemas/auth_schema';
import { validate } from '@middlewares/validate_schema/validade_schema';

const router = Router();

// User Register
router.post('/register', validate(register), ctrlUserAuth.register);
router.get('/register/confirmation', validate(registerConfirmation), ctrlUserAuth.registerConfirm);

// User Login/Logout
router.post('/login', validate(login), auth('login-user'), ctrlUserAuth.login);
router.get('/logout', auth('jwt-user'), ctrlUserAuth.logout);

// User Forgot Password
router.post(
    '/forgotpassword/request',
    validate(forgotPasswordRequest),
    ctrlUserAuth.forgotPasswordRequest,
);
router.post('/forgotpassword/reset', ctrlUserAuth.forgotPasswordReset);

export default router;
