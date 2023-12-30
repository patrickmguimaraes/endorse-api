import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestCopyright from "./request-copyright.model";
import ComplianceMeasure from "./compliance-measure.model";

@Table({timestamps: false,
  tableName: "requestCopyrightComplianceMeasures",
})
export default class RequestCopyrightComplianceMeasure extends Model {
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

  @ForeignKey(() => ComplianceMeasure)
  @Column({
    type: DataType.INTEGER,
    field: "complianceMeasureId",
  })
  complianceMeasureId!: number;

  @BelongsTo(() => ComplianceMeasure)
  complianceMeasure?: ComplianceMeasure;
}
