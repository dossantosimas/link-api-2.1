import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export async function updateEnvVar(
  variable: string,
  value: string,
  direccion: string
): Promise<boolean> {
  try {
    // Ruta del archivo .env
    const envPath = path.join(__dirname, direccion);

    // Carga las variables de entorno desde .env
    dotenv.config({ path: envPath });

    // Modifica la variable de entorno
    process.env[variable] = value;

    // Guarda las variables de entorno modificadas en .env
    fs.writeFileSync(
      envPath,
      Object.entries(process.env)
        .map(([key, val]) => `${key}=${val}`)
        .join('\n')
    );

    return true;
  } catch (error) {
    console.error(`Error al actualizar la variable de entorno: ${error}`);
    return false;
  }
}
