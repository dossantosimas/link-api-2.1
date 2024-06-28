import { IThing, Thing } from '../models/thing.model';

export class ThingsServices {
  async findName(nombre: string) {
    console.log('*************** LLEGO A CREATE ***************');
    const exist = await await Thing.findOne({
      where: {
        name: nombre,
      },
    });

    console.log('EXIST:', exist)
  }
}


export const ThingInstance = new ThingsServices()