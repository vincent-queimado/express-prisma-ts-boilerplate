import express from 'express';
import CtrlCommons from '../api/controllers/commons';
import CtrlLogs from '../api/controllers/logs';

const router = express.Router();

// Cors Settings
router.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    next();
});

// API Redirects
router.get('/', CtrlCommons.root);

// API Info
router.get('/info', CtrlCommons.info);

// API Logs
router.get('/logs', CtrlLogs.listar);

export default router;
