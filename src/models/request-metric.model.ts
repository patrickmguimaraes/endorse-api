import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import Metric from "./metric.model";

@Table({timestamps: false,
  tableName: "requestMetrics",
})
export default class RequestMetric extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Request)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => Request)
  request?: Request;

  @ForeignKey(() => Metric)
  @Column({
    type: DataType.INTEGER,
    field: "metricId",
  })
  metricId!: number;

  @BelongsTo(() => Metric)
  metric?: Metric;
}
