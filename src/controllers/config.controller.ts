import { Request, Response } from 'express';
import { DockerCompose } from '../services/compose.services';
import { DockerAPI } from '../services/api.docker.services';

import { updateEnvVar } from '../utils/variables';

import { ComandoLocales } from '../services/comandos.services';
import { Telegraf } from '../services/telegraf.services';

import { sleep } from '../utils/time';

export async function InstallComponents(req: Request, res: Response) {
  try {
    console.log('llego a Install');
    let token;
    let influx_install: boolean = false;

    //ejecutar docker compose para instalar influxdb
    const dc_influx = await DockerCompose.InstallServicio('influxdb');
    if (!dc_influx)
      res.status(500).json({ msg: 'No se pudo instalar influxdb' });

    let exec_start = null;
    let attempts = 0;

    const exec_body = {
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ['influx', 'auth', 'list'],
      Tty: false,
    };

    while (exec_start === null && attempts < 5) {
      const cont_influxdb = await DockerAPI.GetContenedor('influxdb');

      if (cont_influxdb && cont_influxdb.State === 'running') {
        let exec_id = await DockerAPI.ExecId(cont_influxdb.Id, exec_body);

        if (exec_id) {
          exec_start = await DockerAPI.RunExec(exec_id.Id);
          attempts++;
          if (exec_start === null) {
            console.log(`Intento ${attempts} falló, reintentando...`);
          }
        } else {
          console.log(`Intento ${attempts} falló, reintentando...`);
        }

        if (exec_start !== null) {
          let lines = exec_start.split('\n');
          let tokenLine = lines[1];
          token = tokenLine.split(/\s+/)[3];
          console.log('TOKEN:', token);
          influx_install = true;
          await updateEnvVar(
            'INFLUXDB_TOKEN',
            token,
            '../../docker/start/telegraf.env'
          );
        } else {
          res.status(500).json({ msg: 'Influx no entrega TOKEN' });
        }
      } else {
        console.log(`Intento ${attempts} falló, reintentando...`);
      }

      await sleep(4000);
    }

    if (!influx_install)
      res.status(500).json({ msg: 'No se pudo instalar influxdb' });

    //ejecutar docker compose para instalar telegraf

    const dc_telegraf = await DockerCompose.InstallServicio('telegraf');
    if (!dc_telegraf)
      res.status(500).json({ msg: 'No se pudo instalar telegraf' });

    // //conseder permiso para telegraf
    // const run_permissions = await ComandoLocales.Run('sudo chmod +w $PWD/docker/telegraf/telegraf.conf')
    // if(!run_permissions) res.status(500).json({ msg: 'No se pudo dar permiso a telegraf.conf' });

    // //generar archivo de configuracion
    // const create_telegraf_conf = await Telegraf.CreateConfFile()
    // if(!create_telegraf_conf) res.status(500).json({ msg: 'No se pudo dar crear telegraf.conf' });

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
