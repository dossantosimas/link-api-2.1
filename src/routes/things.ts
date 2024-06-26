import { Router } from 'express';
import { getAllMeasurements, getAllFields } from '../controllers/thing.controller';

const router = Router();

router
.get('/measurements/all', getAllMeasurements)
.get('/fields/all', getAllFields)
.post('/influxdb/config')


export default router;
