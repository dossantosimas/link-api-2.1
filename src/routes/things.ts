import { Router } from 'express';
import { getAllMeasurements, getAllFields } from '../controllers/thing.controller';

const router = Router();

router.get('/measurements/all', getAllMeasurements);
router.get('/fields/all', getAllFields)

export default router;
