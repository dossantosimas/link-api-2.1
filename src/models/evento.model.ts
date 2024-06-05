import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

export enum Estado {
  OK = 'ok',
  BAD = 'bad',
  ON_HOLD = 'on hold',
}

@Table
export class Eventos extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.JSON)
  body: object;

  @Column
  ruta: string;

  @Column(DataType.ENUM('ok', 'bad', 'on hold'))
  estado: Estado;

  @Column
  intentos: string;
}

export interface IEventos {
  id: number;
  body: object;
  ruta: string;
  estado: Estado;
  intentos: number;
}
