import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import ComplianceMeasure from "./compliance-measure.model";

@Table({timestamps: false,
  tableName: "requestComplianceMeasures",
})
export default class RequestComplianceMeasure extends Model {
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

  @ForeignKey(() => ComplianceMeasure)
  @Column({
    type: DataType.INTEGER,
    field: "complianceMeasureId",
  })
  complianceMeasureId!: number;

  @BelongsTo(() => ComplianceMeasure)
  complianceMeasure?: ComplianceMeasure;
}
