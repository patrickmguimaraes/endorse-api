import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "followers",
})
export default class Follower extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "followerId",
    primaryKey: true,
  })
  followerId?: number;

  @BelongsTo(() => User)
  follower?: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "followedId",
    primaryKey: true,
  })
  followedId?: number;

  @BelongsTo(() => User)
  followed?: User;
}
