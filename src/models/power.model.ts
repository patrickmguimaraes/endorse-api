import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";

@Table({timestamps: false,
  tableName: "powers",
})
export default class Power extends Model {
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
    primaryKey: true,
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
    primaryKey: true,
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
