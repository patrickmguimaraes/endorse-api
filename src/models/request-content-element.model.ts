import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import ContentElement from "./content-element.model";

@Table({timestamps: false,
  tableName: "requestContentElements",
})
export default class RequestContentElement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Request)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => Request)
  request?: Request;

  @ForeignKey(() => ContentElement)
  @Column({
    type: DataType.INTEGER,
    field: "contentElementId",
  })
  contentElementId!: number;

  @BelongsTo(() => ContentElement)
  contentElement?: ContentElement;
}
