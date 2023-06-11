import { Router } from 'express';
import CtrlCommons from '@controllers/commons_controller';

const router = Router();

// API Info
router.get('/', CtrlCommons.info);

export default router;
