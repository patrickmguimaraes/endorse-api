import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestComplianceMeasure from "./request-compliance-measure.model";

@Table({timestamps: false,
  tableName: "complianceMeasures",
})
export default class ComplianceMeasure extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(100),
    field: "name"
  })
  name?: string;

  @HasMany(() => RequestComplianceMeasure, { foreignKey: 'complianceMeasureId', sourceKey: 'id' })
  requestComplianceMeasures?: RequestComplianceMeasure[];
}