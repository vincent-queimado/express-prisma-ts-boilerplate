import { Router } from 'express';

import auth from '@middlewares/auth/authenticate';
import ctrlUserMe from '@controllers/client/users_me_controller';

const router = Router();

// Manage User Profile
router.get('/', auth('jwt-user'), ctrlUserMe.showMe);
router.patch('/', auth('jwt-user'), ctrlUserMe.updateMe);
router.delete('/', auth('jwt-user'), ctrlUserMe.deleteMe);

export default router;
