import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";

@Table({
  tableName: "views",
})
export default class View extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
    primaryKey: true,
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
    primaryKey: true,
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;
}
