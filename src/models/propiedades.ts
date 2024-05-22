import { Table, Column, Model, PrimaryKey, AutoIncrement, NotNull } from 'sequelize-typescript';

@Table
export class Propiedades extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: true })
  propiedad: string;

  @Column({ allowNull: true })
  valor_propiedad: string
}

export interface IPropiedad {
  id: number,
  propiedad: string,
  valor_propiedad: string
}
