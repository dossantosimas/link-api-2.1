import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Metric } from './metric.model';
import { Thing } from './thing.model';

@Table({ timestamps: false, tableName: 'point' })
export class Point extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    name: string;

    @Column({ type: DataType.TEXT, allowNull: true, defaultValue: null })
    sub_creator: string;

    @ForeignKey(() => Metric)
    @Column({ allowNull: false })
    metric_id: number;

    @ForeignKey(() => Thing)
    @Column({ allowNull: false })
    thing_id: number;

    @BelongsTo(() => Metric)
    metric: Metric;

    @BelongsTo(() => Thing)
    thing: Thing;
}
