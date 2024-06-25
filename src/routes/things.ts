import { Router } from 'express';
import { getAllMetrics } from '../controllers/thing.controller';

const router = Router();

router.get('/things', getAllMetrics);

export default router;
