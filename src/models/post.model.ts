import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Like from "./like.model";
import Endorsement from "./endorsement.model";
import Comment from "./comment.model";
import View from "./view.model";

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
    type: DataType.TEXT('long'),
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.STRING(100),
    field: "image"
  })
  image?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "isArticle"
  })
  isArticle?: boolean;

  @Column({
    type: DataType.STRING(100),
    field: "title"
  })
  title?: string;

  @Column({
    type: DataType.STRING(200),
    field: "subject"
  })
  subject?: string;

  @Column({
    type: DataType.STRING(100),
    field: "author"
  })
  author?: string;

  @Column({
    type: DataType.STRING(100),
    field: "video"
  })
  video?: string;

  @Column({
    type: DataType.INTEGER,
    field: "likes"
  })
  likes?: number;

  @Column({
    type: DataType.INTEGER,
    field: "comments"
  })
  comments?: number;

  @Column({
    type: DataType.INTEGER,
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

  @HasMany(() => View, { foreignKey: 'postId', sourceKey: 'id' })
  views?: View[];
}
