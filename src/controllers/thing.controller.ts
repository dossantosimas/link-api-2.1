import { Request, Response } from 'express';
import { InfluxDBInstance as Influx } from '../services/influxdb.services';
import { ThingInstance as Thing } from '../services/things.services';
import { ComandoLocales } from '../services/comandos.services';
import { IThing } from '../models/thing.model';

export async function getAllMeasurements(req: Request, res: Response) {
  try {
    console.log('--------- TODAS LOS MEASUREMENTS ---------');
    const lista = await Influx.getAllMeasurements('ibisa');
    console.log('LISTA:', lista);

    res.json({
      msg: 'test',
      measurements: lista,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}

export async function getAllFields(req: Request, res: Response) {
  try {
    console.log('--------- TODAS LOS FIELDS ---------');
    const lista = await Influx.getAllFields('modbus', 'ibisa');
    console.log('LISTA:', lista);

    res.json({
      msg: 'test',
      field: lista,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}

export async function getConfig(req: Request, res: Response) {
  try {
    console.log('--------- TODAS LAS CONFIGURACIONES ---------');
    const response = await Influx.getIDs();

    if (response) {
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

export async function create(req: Request, res: Response) {
  try {
    console.log('--------- CREAR THING ---------');
    const body: IThing = req.body;
    const exist = await Thing.findName(body.name);
    console.log('----> PASO 1')

    if (exist) {
      res.status(409).json({
        msg: 'Ya existe una cosa con el mismo nombre.',
      });
    }
    console.log('----> PASO 2')

    const newThing = await Thing.create(body)
    console.log('NEW THING:', newThing)



    // if(response){
    //   res.json({
    //     msg: 'Configuracion correcta',
    //   });
    // } else {
    //   res.json({
    //     msg: 'Configuracion incorrecta',
    //   });
    // }

    res.json({
      msg: 'Configuracion correcta',
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
