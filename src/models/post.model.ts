import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Like from "./like.model";
import Endorsement from "./endorsement.model";
import Comment from "./comment.model";

@Table({
  tableName: "posts",
})
export default class Post extends Model {
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

  @Column({
    type: DataType.STRING(10),
    field: "types"
  })
  type?: string;

  @Column({
    type: DataType.TEXT,
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.STRING(100),
    field: "image"
  })
  image?: string;

  @Column({
    type: DataType.STRING(100),
    field: "video"
  })
  video?: string;

  @Column({
    type: DataType.NUMBER,
    field: "likes"
  })
  likes?: number;

  @Column({
    type: DataType.NUMBER,
    field: "comments"
  })
  comments?: number;

  @Column({
    type: DataType.NUMBER,
    field: "endorsements"
  })
  endorsements?: number;

  @Column({
    type: DataType.STRING(100),
    field: "link"
  })
  link?: string;

  @Column({
    type: DataType.STRING(7),
    field: "status"
  })
  status?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => Endorsement, { foreignKey: 'postId', sourceKey: 'id' })
  endorsementsObject?: Endorsement[];

  @HasMany(() => Comment, { foreignKey: 'postId', sourceKey: 'id' })
  commentsObject?: Comment[];

  @HasMany(() => Like, { foreignKey: 'postId', sourceKey: 'id' })
  likesObject?: Like[];
}
