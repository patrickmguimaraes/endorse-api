import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Company from "./company.model";
import Post from "./post.model";
import Category from "./category.model";
import File from "./file.model";
import Tag from "./tag.model";
import ShowcaseTag from "./showcase-tag.model";

@Table({timestamps: false,
  tableName: "showcases",
})
export default class Showcase extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(100),
    field: "title"
  })
  title?: string;

  @Column({
    type: DataType.STRING(1500),
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.STRING(1500),
    field: "implementationPlan"
  })
  implementationPlan?: string;

  @Column({
    type: DataType.STRING(1500),
    field: "challenges"
  })
  challenges?: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: "categoryId",
  })
  categoryId!: number;

  @BelongsTo(() => Category)
  category?: Category;

  @HasMany(() => File, { foreignKey: 'showcaseId', sourceKey: 'id' })
  files?: File[];

  @HasMany(() => ShowcaseTag, { foreignKey: 'showcaseId', sourceKey: 'id' })
  tags?: ShowcaseTag[];
}