import { Request, Response } from 'express';
import { InfluxDBInstance as Influx } from '../services/influxdb.services';
import { ThingInstance as Thing } from '../services/things.services';
import { ComandoLocales } from '../services/comandos.services';
import { IThing } from '../models/thing.model';

export async function getAllMeasurements(req: Request, res: Response) {
  try {
    const { bucket } = req.body;
    console.log('--------- TODAS LOS MEASUREMENTS ---------');
    console.log('Bucket:', bucket);

    if (bucket) {
      const lista = await Influx.getAllMeasurements(bucket);
      console.log('LISTA:', lista);
      res.json({
        msg: 'Todos los MEASURMENTS',
        success: true,
        measurements: lista,
      });
    } else {
      res.json({
        msg: 'Falta el bucket',
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}

export async function getAllFields(req: Request, res: Response) {
  try {
    const { bucket, measurement } = req.body;
    console.log('--------- TODAS LOS FIELDS ---------');
    console.log('Bucket:', bucket);
    console.log('Measurement:', measurement);

    if (bucket || measurement) {
      const lista = await Influx.getAllFields(measurement, bucket);
      console.log('LISTA:', lista);
      res.json({
        msg: 'Todos los FIELDS',
        success: true,
        measurements: lista,
      });
    } else {
      res.json({
        msg: 'Falta el bucket o/y measurement ',
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}

export async function getData(req: Request, res: Response) {
  try {
    const { bucket, measurement, field, range, yields } = req.body;
    console.log('--------- QUERY DATA---------');

    if (bucket || measurement || field || range || yields) {
      const lista = await Influx.getData(
        bucket,
        measurement,
        field,
        range,
        yields
      );
      // console.log('LISTA:', lista);
      res.json({
        msg: 'Todos los puntos',
        success: true,
        measurements: lista,
      });
    } else {
      res.json({
        msg: 'Falta algun parametro',
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}

// export async function getConfig(req: Request, res: Response) {
//   try {
//     console.log('--------- TODAS LAS CONFIGURACIONES ---------');
//     const response = await Influx.getIDs();

//     if (response) {
//       res.json({
//         msg: 'Configuracion correcta',
//       });
//     } else {
//       res.json({
//         msg: 'Configuracion incorrecta',
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ msg: 'Error en el API', error: error });
//   }
// }

// export async function create(req: Request, res: Response) {
//   try {
//     console.log('--------- CREAR THING ---------');
//     // const body: IThing = req.body;
//     // console.log('BODY:', body);

//     const { name, description } = req.body;

//     if (!name) {
//       return res.json({
//         msg: 'Falta parametro NAME',
//       });
//     }

//     const exist = await Thing.findName(name);

//     if (exist) {
//       return res.status(409).json({
//         msg: 'Ya existe una cosa con el mismo nombre.',
//       });
//     }

//     // const created = await Thing.create(name, description)

//     if(!created) {
//       return res.status(409).json({
//         msg: 'Error al crear Thing',
//       });
//     }

//     const newThing = created?.dataValues
//     console.log('NEW THING:', newThing)

//     var thing_json = newThing;
//     var labels = [];
//     var points = [];

//     return res.json({
//       msg: 'Se creo el THING',
//     });
//   } catch (error) {
//     res.status(500).json({ msg: 'Error en el API', error: error });
//   }
// }
