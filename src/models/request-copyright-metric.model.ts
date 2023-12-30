import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestCopyright from "./request-copyright.model";
import Metric from "./metric.model";

@Table({timestamps: false,
  tableName: "requestCopyrightMetrics",
})
export default class RequestCopyrightMetric extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => RequestCopyright)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => RequestCopyright)
  request?: RequestCopyright;

  @ForeignKey(() => Metric)
  @Column({
    type: DataType.INTEGER,
    field: "metricId",
  })
  metricId!: number;

  @BelongsTo(() => Metric)
  metric?: Metric;
}
