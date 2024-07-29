import { Router } from 'express';
// import { getAllMeasurements, getAllFields, getConfig } from '../controllers/thing.controller';
import { getAllMeasurements, getAllFields, getData, postData } from '../controllers/thing.controller';


const router = Router();

router
.post('/measurements/all', getAllMeasurements)
.post('/fields/all', getAllFields)
.post('/data', getData)
.post('/write', postData)
// .post('/influxdb/config', getConfig)
// .post('/', create )


export default router;
