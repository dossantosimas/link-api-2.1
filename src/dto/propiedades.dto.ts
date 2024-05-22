import { Propiedades } from "../models/propiedades";

export interface CreatePropiedadDto extends Omit<Propiedades, 'id' >{}

export interface UpdatePropiedadDto extends Omit<Propiedades, 'propiedad'>{}
