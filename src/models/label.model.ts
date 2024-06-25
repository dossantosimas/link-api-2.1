import { Table, Column, Model, PrimaryKey, AutoIncrement, NotNull } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'label' })
export class Label extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({ allowNull: true })
    name: string;
  
    @Column({ allowNull: true })
    tenant: string
}