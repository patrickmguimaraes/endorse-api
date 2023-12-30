import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestCopyright from "./request-copyright.model";
import ContentElement from "./content-element.model";

@Table({timestamps: false,
  tableName: "requestCopyrightContentElements",
})
export default class RequestCopyrightContentElement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => RequestCopyright)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => RequestCopyright)
  request?: RequestCopyright;

  @ForeignKey(() => ContentElement)
  @Column({
    type: DataType.INTEGER,
    field: "contentElementId",
  })
  contentElementId!: number;

  @BelongsTo(() => ContentElement)
  contentElement?: ContentElement;
}
