import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Logger from './lib/logger';
import morganMiddleware from './config/morganMidd';
import { start_db } from './lib/sqlite';
import cors from 'cors';
import { PropiedadesSerivices } from './services/propiedades.services';

import RouteConfig from './routes/config';
import RouteBuffer from './routes/buffer'
import RouterThing from './routes/things'

dotenv.config();

const app: Express = express();
app.use(express.json());
app.enable('trust proxy');
app.use(morganMiddleware);

const port = process.env.PORT || 3001;

// (async () => {
//   await start_db();
//   const propiedadService = new PropiedadesSerivices();

//   const propiedades = await propiedadService.getAll();
//   console.log('PROPIEDADES: ', propiedades.length);

//   if (propiedades.length === 0) {
//     const prePropiedades = await propiedadService.preCargaDatos();
//     console.log('PRE PROPIEDADES: ', prePropiedades);
//   }
// })();

// Habilita CORS para todas las rutass
app.use(cors());

// app.use('/api/v1/config', RouteConfig);
// app.use('/api/v1/buffer', RouteBuffer);
app.use('/api/vs/things', RouterThing)

app.get('/logger', (_, res) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');

  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://0.0.0.0:${port}`);
});
