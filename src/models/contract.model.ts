import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "contracts",
})
export default class Contract extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(1000),
    field: "text"
  })
  text?: string;

  @HasMany(() => User, { foreignKey: 'userId' })
  users?: User[];

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;
}
