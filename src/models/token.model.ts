import { Model, Table, Column, DataType, HasMany, BelongsTo, HasOne, ForeignKey } from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "tokens",
})
export default class Token extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    field: "token"
  })
  token?: string;

  @Column({
    type: DataType.STRING(14),
    field: "type"
  })
  type?: string;

  @Column({
    type: DataType.DATE,
    field: "expires"
  })
  expires?: Date;

  @Column({
    type: DataType.BOOLEAN,
    field: "blacklisted"
  })
  blacklisted?: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
