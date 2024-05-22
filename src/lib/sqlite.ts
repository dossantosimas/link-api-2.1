import { Sequelize } from 'sequelize-typescript';
// import config from "../config/config";
// import { Propiedades } from '../models/edge/propiedades/propiedades';
import { Propiedades } from '../models/propiedades';
// import { Eventos } from '../models/eventos/eventos';
import dotenv from 'dotenv'; 
import { Dialect } from 'sequelize';

dotenv.config();

console.log('Database: ',process.env.DB_HOST)
console.log('Dialect:', process.env.DB_DIALECT)

// Conexión a la base de datos 'edge'
export const sequelizeEdge = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  storage: './storage/db_ibisa.sqlite',
  models: [Propiedades]
});


export async function start_db(): Promise<void> {
  try {
    await sequelizeEdge.authenticate();
    console.log('Conexión con la base de datos edge establecida con éxito.');
    await sequelizeEdge.sync()

    // await sequelizeMuestras.authenticate();
    // console.log('Conexión con la base de datos muestras establecida con éxito.');

    // await sequelizeLogs.authenticate();
    // console.log('Conexión con la base de datos logs establecida con éxito.');

  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
