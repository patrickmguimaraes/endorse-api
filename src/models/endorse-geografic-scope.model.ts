import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import GeograficScope from "./geografic-scope.model";

@Table({
  tableName: "endorseGeograficScopes",
})
export default class EndorseGeograficScope extends Model {
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

  @ForeignKey(() => GeograficScope)
  @Column({
    type: DataType.INTEGER,
    field: "geograficScopeId",
  })
  geograficScopeId!: number;

  @BelongsTo(() => GeograficScope)
  geograficScope?: GeograficScope;
}
