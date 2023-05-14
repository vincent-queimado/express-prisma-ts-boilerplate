import { Router, Request, Response, NextFunction } from 'express';
import CtrlCommons from '@controllers/commons.controller';
import CtrlLogs from '@controllers/logs.controller';

const router = Router();

// Cors Settings
router.all('/*', (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    next();
});

// API Root Redirect
router.get('/', CtrlCommons.root);

// API Info
router.get('/info', CtrlCommons.info);

// API Logs
router.get('/logs', CtrlLogs.listar);

export default router;
