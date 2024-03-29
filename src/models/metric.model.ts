import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestMetric from "./request-copyright-metric.model";

@Table({timestamps: false,
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

  @HasMany(() => RequestMetric, { foreignKey: 'metricId', sourceKey: 'id' })
  requestMetrics?: RequestMetric[];
}
