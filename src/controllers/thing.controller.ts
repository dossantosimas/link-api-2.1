import { Request, Response } from 'express';
import { InfluxDBInstance as Influx } from '../services/influxdb.services';

export async function getAllMetrics(req: Request, res: Response) {
  try {
    console.log('--------- TODAS LAS METRICAS ---------');
    const lista = await Influx.getAllMeasurements('ibisa')
    console.log('LISTA:', lista)

    res.json({
        msg: 'test',
      });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
