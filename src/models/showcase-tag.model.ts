import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Showcase from "./showcase.model";
import Tag from "./tag.model";

@Table({timestamps: false,
  tableName: "showcaseTags",
})
export default class ShowcaseTag extends Model {
  @ForeignKey(() => Showcase)
  @Column({
    type: DataType.INTEGER,
    field: "showcaseId",
  })
  showcaseId!: number;

  @BelongsTo(() => Showcase)
  showcase?: Showcase;

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