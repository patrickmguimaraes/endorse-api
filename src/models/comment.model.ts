import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";

@Table({
  tableName: "comments",
})
export default class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(500),
    field: "text"
  })
  text?: string;

  @Column({ 
    type: DataType.STRING(7),
    field: "status"
  })
  status?: string;

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

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: "commentId",
  })
  commentId!: number;

  @BelongsTo(() => Comment)
  comment?: Comment;

  @HasMany(() => Comment, { foreignKey: 'commentId', sourceKey: 'id' })
  comments?: Comment[];
}
