import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import specs from '@utils/swagger/postman_to_swagger';

const router = Router();

// API Generated Doc
const doc = async () => {
    router.use('/', swaggerUi.serve);
    router.get('/', swaggerUi.setup(await specs()));
};

doc();

export default router;
