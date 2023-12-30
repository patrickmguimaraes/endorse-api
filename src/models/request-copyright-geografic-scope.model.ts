import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestCopyright from "./request-copyright.model";
import GeograficScope from "./geografic-scope.model";

@Table({timestamps: false,
  tableName: "requestCopyrightGeograficScopes",
})
export default class RequestCopyrightGeograficScope extends Model {
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

  @ForeignKey(() => GeograficScope)
  @Column({
    type: DataType.INTEGER,
    field: "geograficScopeId",
  })
  geograficScopeId!: number;

  @BelongsTo(() => GeograficScope)
  geograficScope?: GeograficScope;
}
