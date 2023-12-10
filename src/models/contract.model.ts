import { Model, Table, Column, DataType, HasMany, BelongsTo, HasOne } from "sequelize-typescript";
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
    type: DataType.TEXT,
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @HasMany(() => User, { foreignKey: 'contractId', sourceKey: 'id' })
  users?: User[];
}
