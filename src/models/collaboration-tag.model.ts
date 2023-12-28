import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Collaboration from "./collaboration.model";
import Tag from "./tag.model";

@Table({timestamps: false,
  tableName: "collaborationTags",
})
export default class CollaborationTag extends Model {
  @ForeignKey(() => Collaboration)
  @Column({
    type: DataType.INTEGER,
    field: "collaborationId",
  })
  collaborationId!: number;

  @BelongsTo(() => Collaboration)
  collaboration?: Collaboration;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    field: "tagId",
  })
  tagId!: number;

  @BelongsTo(() => Tag)
  tag?: Tag;

  @Column({
    type: DataType.STRING,
    field: "originalTag"
  })
  originalTag?: string;
}