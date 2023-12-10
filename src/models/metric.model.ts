import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import EndorseMetric from "./endorse-metric.model";

@Table({
  tableName: "metrics",
})
export default class Metric extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(50),
    field: "name"
  })
  name?: string;

  @HasMany(() => EndorseMetric, { foreignKey: 'metricId', sourceKey: 'id' })
  endorseMetrics?: EndorseMetric[];
}
