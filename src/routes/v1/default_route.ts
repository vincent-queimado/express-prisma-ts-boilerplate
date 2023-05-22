import { Router, Request, Response, NextFunction } from 'express';
import CtrlCommons from '@controllers/commons_controller';

const router = Router();

// API Root Redirect
router.get('/', CtrlCommons.root);

// API Info
router.get('/info', CtrlCommons.info);

export default router;
