import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import Metric from "./metric.model";

@Table({
  tableName: "endorseMetrics",
})
export default class EndorseMetric extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
  })
  endorseId!: number;

  @BelongsTo(() => Endorse)
  endorse?: Endorse;

  @ForeignKey(() => Metric)
  @Column({
    type: DataType.INTEGER,
    field: "metricId",
  })
  metricId!: number;

  @BelongsTo(() => Metric)
  metric?: Metric;
}
