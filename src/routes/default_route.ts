import { Router } from 'express';
import CtrlCommons from '@controllers/commons_controller';

const router = Router();

// API Root Redirect
router.get('/', CtrlCommons.root);

export default router;