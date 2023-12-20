import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import GeograficScope from "./geografic-scope.model";

@Table({
  tableName: "requestGeograficScopes",
})
export default class RequestGeograficScope extends Model {
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

  @ForeignKey(() => GeograficScope)
  @Column({
    type: DataType.INTEGER,
    field: "geograficScopeId",
  })
  geograficScopeId!: number;

  @BelongsTo(() => GeograficScope)
  geograficScope?: GeograficScope;
}
