import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import TermAndCondition from "./term-and-condition.model";

@Table({timestamps: false,
  tableName: "userTermsAndConditions",
})
export default class UserTermAndCondition extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @ForeignKey(() => TermAndCondition)
  @Column({
    type: DataType.INTEGER,
    field: "termAndConditionId",
  })
  termAndConditionId!: number;

  @BelongsTo(() => TermAndCondition)
  termAndCondition?: TermAndCondition;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
