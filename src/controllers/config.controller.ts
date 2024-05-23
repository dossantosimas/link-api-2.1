import { Request, Response } from 'express';
import { DockerCompose } from '../services/compose.services';
import { DockerAPI } from '../services/api.docker.services';

export async function InstallComponents(req: Request, res: Response) {
  try {
    console.log('llego a Install');
    let token
    //ejecutar docker compose para instalar influxdb
    const result = await DockerCompose.InstallServicio('influxdb');
    if (!result) res.status(500).json({ msg: 'No se pudo instalar influxdb' });

    //obtener contenedor influxdb
    const cont_influxdb = await DockerAPI.GetContenedor('influxdb');
    // if (!cont_influxdb)
    //   res.status(500).json({ msg: 'No se encontro contenedor influxdb' });
    // else {
    //   //body para exec
    //   const exec_body = {
    //     AttachStdin: false,
    //     AttachStdout: true,
    //     AttachStderr: true,
    //     Cmd: ['influx', 'auth', 'list'],
    //     Tty: false,
    //   };

    //   //obtener ID de exec
    //   const exec_id = await DockerAPI.ExecId(cont_influxdb.Id, exec_body);

    //   if(!exec_id){
    //     res.status(500).json({ msg: 'No se genero ID para exec' });
    //   } else {
    //     //ejecutar exec con ID
    //     const exec_start = await DockerAPI.RunExec(exec_id.Id)

    //     //obtener token de influxdb
    //     if(exec_start){
    //       let lines = exec_start.split('\n');
    //       let tokenLine = lines[1];
    //       token = tokenLine.split(/\s+/)[3];
    //       res.json({ token: token });
    //     }
    //   }
    // }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
