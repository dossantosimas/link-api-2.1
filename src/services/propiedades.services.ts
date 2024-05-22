import { CreatePropiedadDto, UpdatePropiedadDto } from '../dto/propiedades.dto';

import { Propiedades } from '../models/propiedades';
// import { PropiedadesServicesModel } from '../models/edge/propiedades/propiedades.services.model';
import PropiedadesJson from '../data/propiedades.json';
import { IPropiedad } from '../models/propiedades';

export class PropiedadesSerivices {
  async getAll() {
    const data = await Propiedades.findAll({ raw: true });
    return data;
  }

  async create(data: CreatePropiedadDto) {
    const result = await Propiedades.create({
      data,
    });
    return result;
  }

  async preCargaDatos() {
    try {
      const data = PropiedadesJson;
      data.forEach((item) => {
        Propiedades.create({
          propiedad: item.propiedad,
          valor_propiedad: item.valor_propiedad,
        });
      });
      return true;
    } catch (error) {
      console.error('Ocurrió un error al leer el archivo JSON:', error);
      return false;
    }
  }

  async GetPropiedad(propiedad: string): Promise<IPropiedad | null> {
    try {
      const result: IPropiedad | null = await Propiedades.findOne({
        where: { propiedad: propiedad },
      });
      return result;
    } catch (error) {
      console.error('Ocurrió un error al leer el archivo JSON:', error);
      return null;
    }
  }

  async updatePropiedades(body: UpdatePropiedadDto): Promise<boolean> {
    try {
      const { id, valor_propiedad } = body;
      let algo = await Propiedades.update(
        { valor_propiedad },
        {
          where: { id },
        }
      );
      console.log(algo);
      return true;
    } catch (error) {
      console.log('Error db:', error);
      return false;
    }
  }
}

export const PropiedadesInstance = new PropiedadesSerivices();
