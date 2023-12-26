import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Like from "./power.model";
import Comment from "./comment.model";
import View from "./view.model";
import Article from "./article.model";
import Idea from "./idea.model";
import Endorse from "./endorse.model";
import Power from "./power.model";
import File from "./file.model";
import Showcase from "./showcase.model";

@Table({timestamps: false,
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
    type: DataType.INTEGER,
    field: "powers"
  })
  powers?: number;

  @Column({
    type: DataType.INTEGER,
    field: "endorsements"
  })
  endorsements?: number;

  @Column({
    type: DataType.STRING(200),
    field: "link",
    allowNull: true
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

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    field: "articleId",
  })
  articleId!: number;

  @BelongsTo(() => Article)
  article?: Article;

  @ForeignKey(() => Idea)
  @Column({
    type: DataType.INTEGER,
    field: "ideaId",
  })
  ideaId!: number;

  @BelongsTo(() => Idea)
  idea?: Idea;

  @HasMany(() => Endorse, { foreignKey: 'postId', sourceKey: 'id' })
  endorsementsObject?: Endorse[];

  @HasMany(() => Power, { foreignKey: 'postId', sourceKey: 'id' })
  powersObject?: Power[];

  @HasMany(() => View, { foreignKey: 'postId', sourceKey: 'id' })
  views?: View[];

  @HasMany(() => File, { foreignKey: 'postId', sourceKey: 'id' })
  files?: File[];

  @HasOne(() => Showcase, { foreignKey: 'postId', sourceKey: 'id' })
  showcase?: Showcase;
}
