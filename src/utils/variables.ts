import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import { ComandoLocales } from '../services/comandos.services';

export async function updateEnvVar(
  variable: string,
  value: string,
  direccion: string
): Promise<boolean> {
  try {
    console.log('ACTUALIZANDO VAR')
    // Ruta del archivo .env
    const envPath = path.join(__dirname, direccion);

    await ComandoLocales.Run('sudo chmod 777 $PWD/docker/start/telegraf.env')

    // Carga las variables de entorno desde .env
    const envConfig = dotenv.parse(fs.readFileSync(envPath));

    // Modifica la variable de entorno
    envConfig[variable] = value;

    // Guarda las variables de entorno modificadas en .env
    const envConfigString = Object.entries(envConfig).map(([key, val]) => `${key}=${val}`).join('\n');
    fs.writeFileSync(envPath, envConfigString);

    return true;
  } catch (error) {
    console.error(`Error al actualizar la variable de entorno: ${error}`);
    return false;
  }
}