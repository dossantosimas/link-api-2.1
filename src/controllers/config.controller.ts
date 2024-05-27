import { Request, Response } from 'express';
import { DockerCompose } from '../services/compose.services';
import { DockerAPI } from '../services/api.docker.services';

import { updateEnvVar } from '../utils/variables';

import { ComandoLocales } from '../services/comandos.services';
import { Telegraf } from '../services/telegraf.services';

import { sleep } from '../utils/time';
import { IExecId } from '../models/docker.model';

// export async function InstallComponents(req: Request, res: Response) {
//   try {
//     console.log('llego a Install');
//     let token;
//     let influx_install: boolean = false;

//     //ejecutar docker compose para instalar influxdb
//     const dc_influx = await DockerCompose.InstallServicio('influxdb');
//     if (!dc_influx)
//       res.status(500).json({ msg: 'No se pudo instalar influxdb' });

//     let exec_start = null;
//     let attempts = 0;

//     const exec_body = {
//       AttachStdin: false,
//       AttachStdout: true,
//       AttachStderr: true,
//       Cmd: ['influx', 'auth', 'list'],
//       Tty: false,
//     };

//     while (exec_start === null && attempts < 5) {
//       const cont_influxdb = await DockerAPI.GetContenedor('influxdb');

//       if (cont_influxdb && cont_influxdb.State === 'running') {
//         let exec_id = await DockerAPI.ExecId(cont_influxdb.Id, exec_body);

//         if (exec_id) {
//           exec_start = await DockerAPI.RunExec(exec_id.Id);
//           attempts++;
//           if (exec_start === null) {
//             console.log(`Intento ${attempts} falló, reintentando...`);
//           }
//         } else {
//           console.log(`Intento ${attempts} falló, reintentando...`);
//         }

//         if (exec_start !== null) {
//           let lines = exec_start.split('\n');
//           let tokenLine = lines[1];
//           token = tokenLine.split(/\s+/)[3];
//           console.log('TOKEN:', token);
//           influx_install = true;
//           await updateEnvVar(
//             'INFLUXDB_TOKEN',
//             token,
//             '../../docker/start/telegraf.env'
//           );
//         } else {
//           res.status(500).json({ msg: 'Influx no entrega TOKEN' });
//         }
//       } else {
//         console.log(`Intento ${attempts} falló, reintentando...`);
//       }

//       await sleep(4000);
//     }

//     if (!influx_install)
//       res.status(500).json({ msg: 'No se pudo instalar influxdb' });

//     //ejecutar docker compose para instalar telegraf

//     const dc_telegraf = await DockerCompose.InstallServicio('telegraf');
//     if (!dc_telegraf)
//       res.status(500).json({ msg: 'No se pudo instalar telegraf' });

//     // //conseder permiso para telegraf
//     // const run_permissions = await ComandoLocales.Run('sudo chmod +w $PWD/docker/telegraf/telegraf.conf')
//     // if(!run_permissions) res.status(500).json({ msg: 'No se pudo dar permiso a telegraf.conf' });

//     // //generar archivo de configuracion
//     // const create_telegraf_conf = await Telegraf.CreateConfFile()
//     // if(!create_telegraf_conf) res.status(500).json({ msg: 'No se pudo dar crear telegraf.conf' });

//     res.json({ token: token });
//   } catch (error) {
//     res.status(500).json({ msg: 'Error en el API', error: error });
//   }
// }

export async function InstallComponents(req: Request, res: Response) {
  try {
    console.log('--------- Empezando la Instalacion ---------');
    console.log('1. Instalando influxdb');

    const dc_influx = await DockerCompose.InstallServicio('influxdb');

    if (!dc_influx) {
      console.error('Error 1');
      res.status(500).json({ msg: 'No se pudo instalar influxdb' });
    }

    console.log('2. Info Contenedor influxdb');
    let ciclos = 0;
    let cont_influxdb = await DockerAPI.GetContenedor('influxdb');
    console.log('> ID:', cont_influxdb?.Id);

    if (!cont_influxdb) {
      console.error('Error 2');
      res.status(500).json({ msg: 'No se pudo instalar influxdb' });
    }

    let while_ok: boolean = false;
    let token: string;
    let intentos: number = 0;

    let exec_id: IExecId | null;
    let exec_start: string | null;

    const exec_body = {
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ['influx', 'auth', 'list'],
      Tty: false,
    };

    // Tiempo de espera para que arranque influxdb
    await sleep(6000);

    while (!while_ok && intentos < 5) {
      if (cont_influxdb) {
        exec_id = await DockerAPI.ExecId(cont_influxdb.Id, exec_body);

        if (exec_id) {
          exec_start = await DockerAPI.RunExec(exec_id.Id);

          if (
            exec_start &&
            exec_start !==
              'aError: could not find authorization with given parameters: 401 Unauthorized: unauthorized access'
          ) {
            // console.log('RESULTADO:', exec_start);
            while_ok = true;
          }
        }
      }

      if (!while_ok) {
        intentos++;
        console.log(`Intento ${intentos} falló, reintentando...`);
        // Tiempo de espera para que arranque influxdb
        await sleep(4000);
      } else {
        console.log('> Influxdb instalado');
      }
    }

    const dc_telegraf = await DockerCompose.InstallServicio('telegraf');
    if (!dc_telegraf)
      res.status(500).json({ msg: 'No se pudo instalar telegraf' });

    res.json({ token: 'se ejecuto todo bien' });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
