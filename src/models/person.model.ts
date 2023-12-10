import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import User from "./user.model";

@Table({
  tableName: "people",
})
export default class Person extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(20),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING(50),
    field: "surname"
  })
  surname?: string;

  @Column({
    type: DataType.STRING(10),
    field: "birth"
  })
  birth?: string;
  
  @Column({
    type: DataType.STRING(30),
    field: "gender"
  })
  gender?: string;

  @Column({
    type: DataType.STRING(50),
    field: "profession"
  })
  profession?: string;

  @HasOne(() => User, { foreignKey: 'personId', sourceKey: 'id' })
  user?: User;
}
