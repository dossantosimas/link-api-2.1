import { Request, Response } from 'express';
import { DockerCompose } from '../services/compose.services';

export async function InstallComponents(req: Request, res: Response) {
  try {

    console.log('llego a Install')

    const result = DockerCompose.InstallServicio('influxdb')
    console.log('RESULT: ', result)

    res.json({success: true})
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
