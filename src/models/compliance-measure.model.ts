import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import EndorseComplianceMeasure from "./endorse-compliance-measure.model";

@Table({
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

  @HasMany(() => EndorseComplianceMeasure, { foreignKey: 'complianceMeasureId', sourceKey: 'id' })
  endorseComplianceMeasures?: EndorseComplianceMeasure[];
}