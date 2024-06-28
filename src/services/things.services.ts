import { IThing, Thing } from '../models/thing.model';

export class ThingsServices {
  async findName(nombre: string) {
    console.log('*************** LLEGO A CREATE ***************');
    const exist = await await Thing.findOne({
      where: {
        name: nombre,
      },
    });

    return exist
  }

  async create(body: IThing){
    return await Thing.create({
        name: body.name,
        description: body.description,
        status: true, // Set an appropriate value for status
    });
  }
}


export const ThingInstance = new ThingsServices()