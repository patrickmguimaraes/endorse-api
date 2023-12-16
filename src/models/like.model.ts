import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import ActivationDate from "./activation-date.model";
import User from "./user.model";
import Post from "./post.model";

@Table({
  tableName: "likes",
})
export default class Like extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
