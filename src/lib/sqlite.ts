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

console.log('Database: ', process.env.DB_HOST);
console.log('Dialect:', process.env.DB_DIALECT);

export const sequelizeEdge = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME_EDGE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [Propiedades]
});

export const sequelizeThing = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME_THING,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [Eventos, Label, Label_Thing, Metric, Point, Thing]
});

export async function start_db(): Promise<void> {
  try {
    await sequelizeEdge.authenticate();
    await sequelizeThing.authenticate();
    console.log('Conexión con la base de datos edge establecida con éxito.');
    await sequelizeEdge.sync();
    await sequelizeThing.sync();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
