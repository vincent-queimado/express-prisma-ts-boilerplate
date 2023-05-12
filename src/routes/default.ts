import { Router, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from '@utils/swagger/swagger';
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

// API Doc
if (process.env.NODE_ENV === 'development') {
    router.use('/api-doc', swaggerUi.serve);
    router.get('/api-doc', swaggerUi.setup(specs, { explorer: true }));
}

export default router;
