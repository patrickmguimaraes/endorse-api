import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import User from "./user.model";

@Table({
  tableName: "endorseHistory",
})
export default class EndorseHistory extends Model {
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
  date?: string;

  @Column({
    type: DataType.STRING(10),
    field: "action"
  })
  action?: string;

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
  })
  endorseId!: number;

  @BelongsTo(() => Endorse)
  endorse?: Endorse;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
