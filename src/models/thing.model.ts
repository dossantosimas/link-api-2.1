import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'thing' })
export class Thing extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    status: boolean;

    // aplica tenant?
    // @Column({ type: DataType.STRING, allowNull: false })
    // tenant: string;

    // que es?
    // @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    // sub_creator: string;
}

export interface IThing {
    name: string,
    description: string,
    status: string,
    // sub_creator: string
}