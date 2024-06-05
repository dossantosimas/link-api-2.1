import { Eventos } from "../models/evento.model";

export class BufferServices {
    async CrearEvento(body: any){
        console.log('EventoServices . crearEvento:', body);

        const result = await Eventos.create(body);
        console.log('servicio:', result);
        return result;
    }
}


export const BufferInstance = new BufferServices();