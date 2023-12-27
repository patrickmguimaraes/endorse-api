import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Showcase from "./showcase.model";
import ShowcaseTag from "./showcase-tag.model";

@Table({timestamps: false,
  tableName: "tags",
})
export default class Tag extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    field: "name"
  })
  name?: string;

  @HasMany(() => ShowcaseTag, { foreignKey: 'tagId', sourceKey: 'id' })
  showcaseTags?: ShowcaseTag[];
}