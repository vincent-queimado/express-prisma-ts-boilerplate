import { Router } from 'express';
import CtrlLogs from '@controllers/logs.controller';

const router = Router();

// API Logs
router.get('/logs', CtrlLogs.listar);

export default router;
