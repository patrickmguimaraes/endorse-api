import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Company from "./company.model";
import Post from "./post.model";
import CollaborationCategory from "./collaboration-category.model";
import CollaborationRequest from "./collaboration-request.model";
import CollaborationTag from "./collaboration-tag.model";

@Table({timestamps: false,
  tableName: "collaborations",
})
export default class Collaboration extends Model {
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
    type: DataType.STRING(1000),
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.STRING(1000),
    field: "workingExperience"
  })
  workingExperience?: string;

  @Column({
    type: DataType.INTEGER,
    field: "vacacies"
  })
  vacacies?: number;

  @Column({
    type: DataType.STRING(150),
    field: "salary"
  })
  salary?: string;

  @Column({
    type: DataType.DATE,
    field: "deadline"
  })
  deadline?: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
    primaryKey: true,
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @ForeignKey(() => CollaborationCategory)
  @Column({
    type: DataType.INTEGER,
    field: "collaborationCategoryId",
    primaryKey: true,
  })
  collaborationCategoryId!: number;

  @BelongsTo(() => CollaborationCategory)
  collaborationCategory?: CollaborationCategory;
  
  @HasMany(() => CollaborationRequest, { foreignKey: 'collaborationId', sourceKey: 'id' })
  requests?: CollaborationRequest[];

  @HasMany(() => CollaborationTag, { foreignKey: 'collaborationId', sourceKey: 'id' })
  skills?: CollaborationTag[];
}