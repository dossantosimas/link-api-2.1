import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'metric' })
export class Metric extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    name: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    tenant: string;
}
