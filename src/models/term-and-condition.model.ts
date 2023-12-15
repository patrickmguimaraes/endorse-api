import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import UserTermAndCondition from "./user-term-and-condition.model";

@Table({
  tableName: "termsAndConditions",
})
export default class TermAndCondition extends Model {
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

  @Column({
    type: DataType.TEXT,
    field: "text"
  })
  text?: Date;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @HasMany(() => UserTermAndCondition, { foreignKey: 'termAndConditionId', sourceKey: 'id' })
  userTermsAndConditions?: UserTermAndCondition[];
}
