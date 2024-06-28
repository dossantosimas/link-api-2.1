import { Request, Response } from 'express';
import { InfluxDBInstance as Influx } from '../services/influxdb.services';
import { ComandoLocales } from '../services/comandos.services';

export async function getAllMeasurements(req: Request, res: Response) {
  try {
    console.log('--------- TODAS LOS MEASUREMENTS ---------');
    const lista = await Influx.getAllMeasurements('ibisa')
    console.log('LISTA:', lista)

    res.json({
        msg: 'test',
        meMeasurements: lista
      });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}

export async function getAllFields(req: Request, res: Response) {
  try {
    console.log('--------- TODAS LOS FIELDS ---------');
    const lista = await Influx.getAllFields('modbus','ibisa')
    console.log('LISTA:', lista)

    res.json({
        msg: 'test',
        field: lista
      });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}

export async function getConfig(req: Request, res: Response){
  try {
    console.log('--------- TODAS LAS CONFIGURACIONES ---------');
    const response = await Influx.getIDs()
    
    if(response){
      res.json({
        msg: 'Configuracion correcta',
      });
    } else {
      res.json({
        msg: 'Configuracion incorrecta',
      });
    }


  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
