import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from '@utils/swagger/swagger';
import config from '@config/app';

const router = Router();

// API Doc
if (config.isDev) {
    router.use('/api-doc', swaggerUi.serve);
    router.get('/api-doc', swaggerUi.setup(specs, { explorer: true }));
}

export default router;
