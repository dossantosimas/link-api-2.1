import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Label } from './label.model';
import { Thing } from './thing.model';

@Table({ timestamps: false, tableName: 'label_thing' })
export class Label_Thing extends Model {
    @ForeignKey(() => Label)
    @Column({ allowNull: false })
    label_id: number;

    @ForeignKey(() => Thing)
    @Column({ allowNull: false })
    thing_id: number;

    @BelongsTo(() => Label)
    label: Label;

    @BelongsTo(() => Thing)
    thing: Thing;
}
