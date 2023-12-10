import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import EndorseContentElement from "./endorse-content-element.model";

@Table({
  tableName: "contentElements",
})
export default class ContentElement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(50),
    field: "name"
  })
  name?: string;

  @HasMany(() => EndorseContentElement, { foreignKey: 'contentElementId', sourceKey: 'id' })
  endorseContentElements?: EndorseContentElement[];
}