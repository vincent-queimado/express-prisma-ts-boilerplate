import { Router } from 'express';
import ctrlUsers from '@controllers/admin/users_controller';

const router = Router();

// List of All Users
router.get('/', ctrlUsers.showAll);

export default router;
