import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import ContentElement from "./content-element.model";

@Table({
  tableName: "endorseContentElements",
})
export default class EndorseContentElement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
  })
  endorseId!: number;

  @BelongsTo(() => Endorse)
  endorse?: Endorse;

  @ForeignKey(() => ContentElement)
  @Column({
    type: DataType.INTEGER,
    field: "contentElementId",
  })
  contentElementId!: number;

  @BelongsTo(() => ContentElement)
  contentElement?: ContentElement;
}
