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
    // const body: IThing = req.body;
    // console.log('BODY:', body);

    const { name, description } = req.body;

    if (!name) {
      return res.json({
        msg: 'Falta parametro NAME',
      });
    }

    const exist = await Thing.findName(name);

    if (exist) {
      return res.status(409).json({
        msg: 'Ya existe una cosa con el mismo nombre.',
      });
    }

    const created = await Thing.create(name)

    if(!created) {
      return res.status(409).json({
        msg: 'Error al crear Thing',
      });
    }

    const newThing = created?.dataValues
    console.log('NEW THING:', newThing)

    var thing_json = newThing;
    var labels = [];
    var points = [];

    return res.json({
      msg: 'Se creo el THING',
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
