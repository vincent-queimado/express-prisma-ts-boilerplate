import { Router } from 'express';
import ctrlCommons from '@controllers/commons/commons_controller';

const router = Router();

// API Root Redirect
router.get('/', ctrlCommons.root);

export default router;
