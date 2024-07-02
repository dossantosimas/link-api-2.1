import { Sequelize } from 'sequelize-typescript';
import { Propiedades } from '../models/propiedades';
import { Eventos } from '../models/evento.model';
import dotenv from 'dotenv'; 
import { Dialect } from 'sequelize';

import { Label } from '../models/label.model';
import { Label_Thing } from '../models/label_thing.model';
import { Metric } from '../models/metric.model';
import { Point } from '../models/point.model';
import { Thing } from '../models/thing.model';
import { ComandoLocales } from '../services/comandos.services';


dotenv.config();

console.log('Database: ',process.env.DB_HOST)
console.log('Dialect:', process.env.DB_DIALECT)

// Conexión a la base de datos 'edge'


export const sequelizeEdge = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  storage: './docker/storage/db_ibisa.sqlite',
  // models: [Propiedades, Eventos, Label, Label_Thing, Metric, Point, Thing]
  models: [Propiedades]
});

export const sequelizeThing = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  storage: './src/db/thing/db_thing.sqlite',
  models: [Eventos, Label, Label_Thing, Metric, Point, Thing]
});


export async function start_db(): Promise<void> {
  try {
    await ComandoLocales.Run('sudo chmod +777 $PWD/src/db/thing');
    await sequelizeEdge.authenticate();
    await sequelizeThing.authenticate();
    console.log('Conexión con la base de datos edge establecida con éxito.');
    await sequelizeEdge.sync()
    await sequelizeThing.sync()

    await ComandoLocales.Run('sudo chmod +777 $PWD/docker/storage/db_ibisa.sqlite');
    // await ComandoLocales.Run('sudo chmod +777 $PWD/src/db/thing/db_thing.sqlite');
    // await sequelizeMuestras.authenticate();
    // console.log('Conexión con la base de datos muestras establecida con éxito.');

    // await sequelizeLogs.authenticate();
    // console.log('Conexión con la base de datos logs establecida con éxito.');

  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
