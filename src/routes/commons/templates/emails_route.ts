import { Router } from 'express';
import ctrlTemplates from '@controllers/commons/templates/templates_emails_controller';

const router = Router();

// API View Email Templates
router.get('/welcome-user', ctrlTemplates.userWelcome);
router.get('/email-verify', ctrlTemplates.userEmailVerify);
router.get('/password-request', ctrlTemplates.userPasswordRequest);
router.get('/password-reseted', ctrlTemplates.userPasswordReseted);

export default router;
