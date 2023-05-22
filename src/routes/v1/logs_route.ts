import { Router } from 'express';
import CtrlLogs from '@controllers/logs_controller';

const router = Router();

// API Logs
router.get('/', CtrlLogs.listar);

export default router;
