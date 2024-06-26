import { Router } from 'express';
import { getAllMeasurements, getAllFields, getConfig } from '../controllers/thing.controller';

const router = Router();

router
.get('/measurements/all', getAllMeasurements)
.get('/fields/all', getAllFields)
.post('/influxdb/config', getConfig)


export default router;
