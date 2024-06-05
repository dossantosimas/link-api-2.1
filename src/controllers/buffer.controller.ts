import { Request, Response } from 'express';
import { PropiedadesInstance as Propiedades } from '../services/propiedades.services';
import { BufferInstance as Buffer } from '../services/buffer.services';
import { ibisaUrls } from '../utils/url';

export async function saveProcess(req: Request, res: Response) {
  try {
    const { body } = req
    console.log('saveProcess:', body)
    const tenant = await Propiedades.GetPropiedad('Tenant');
    if(tenant){
      const process = {
        body: body,
        ruta: ibisaUrls.process.instantiate(tenant.valor_propiedad),
        intentos: 0,
        estado: 'on hold'
      }
      const result = Buffer.CrearEvento(process)
      res.json({sucess: true, result: result})
    } else{
      res.status(500).json({ sucess: false, message: 'Sin tenant' });
    }

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}

export async function saveNoti(req: Request, res: Response){
  try {
    const { body } = req
    console.log('saveProcess:', body)
    const tenant = await Propiedades.GetPropiedad('Tenant');
    if(tenant){
      const process = {
        body: body,
        ruta: ibisaUrls.toolbox.notifacion(tenant.valor_propiedad),
        intentos: 0,
        estado: 'on hold'
      }
      const result = Buffer.CrearEvento(process)
      res.json({sucess: true, result: result})
    } else{
      res.status(500).json({ sucess: false, message: 'Sin tenant' });
    }

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
