import { Eventos } from '../models/evento.model';

export class BufferServices {
  async Crear(body: any) {
    console.log('EventoServices . crearEvento:', body);

    const result = await Eventos.create(body);
    console.log('New evento:', result);
    return result;
  }

  async GetAll() {
    const result = await Eventos.findAll();
    console.log('Eventos:', result);

    return result;
  }
}

export const BufferInstance = new BufferServices();
