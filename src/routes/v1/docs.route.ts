import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from '@utils/swagger/swagger';

const router = Router();

// API Doc
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, { explorer: true }));

export default router;
