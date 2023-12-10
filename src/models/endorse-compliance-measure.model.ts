import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import ComplianceMeasure from "./compliance-measure.model";

@Table({
  tableName: "endorseComplianceMeasures",
})
export default class EndorseComplianceMeasure extends Model {
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

  @ForeignKey(() => ComplianceMeasure)
  @Column({
    type: DataType.INTEGER,
    field: "complianceMeasureId",
  })
  complianceMeasureId!: number;

  @BelongsTo(() => ComplianceMeasure)
  complianceMeasure?: ComplianceMeasure;
}
