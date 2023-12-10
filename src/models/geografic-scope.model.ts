import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import EndorseGeograficScope from "./endorse-geografic-scope.model";

@Table({
  tableName: "geograficScopes",
})
export default class GeograficScope extends Model {
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

  @HasMany(() => EndorseGeograficScope, { foreignKey: 'geograficScopeId', sourceKey: 'id' })
  endorseGeograficScopes?: EndorseGeograficScope[];
}