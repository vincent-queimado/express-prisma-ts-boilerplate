import { Router } from 'express';
import CtrlUsers from '@controllers/admin/users_controller';

const router = Router();

// List of All Users
router.get('/', CtrlUsers.showAll);

export default router;
