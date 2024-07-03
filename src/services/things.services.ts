import { IThing, Thing } from '../models/thing.model';

export class ThingsServices {
  async findName(nombre: string) {
    console.log('*************** LLEGO A CREATE ***************');
    const exist = await Thing.findOne({
      where: {
        name: nombre,
      },
    });
    console.log('EXIST:', exist)
    return exist
  }

  async create(name: IThing){

    try{
        return await Thing.create({
            name: body.name,
            description: body.description,
            status: true, // Set an appropriate value for status
        });
    } catch(error){
        console.error('ThingsServices.create:', error)
        return undefined
    }

  }
}


export const ThingInstance = new ThingsServices()