import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";
import Endorse from "./endorse.model";

@Table({timestamps: false,
  tableName: "endorseViews",
})
export default class EndorseView extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
    primaryKey: true,
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
    primaryKey: true,
  })
  endorseId!: number;

  @BelongsTo(() => Endorse)
  endorse?: Endorse;
}
