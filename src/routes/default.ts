import express from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from '@utils/swagger/swagger';
import CtrlCommons from '@controllers/commons';
import CtrlLogs from '@controllers/logs';

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

// API Root Redirect
router.get('/', CtrlCommons.root);

// API Info
/**
 * @openapi
 * paths:
 *   /info/:
 *     get:
 *       summary: Api Information Details
 *       tags: [Informations]
 *       responses:
 *         "200":
 *           description: hello world
 */
router.get('/info', CtrlCommons.info);

// API Logs
router.get('/logs', CtrlLogs.listar);

// API Doc
if (process.env.NODE_ENV === 'development') {
    router.use('/api-doc', swaggerUi.serve);
    router.get('/api-doc', swaggerUi.setup(specs, { explorer: true }));
}

export default router;
