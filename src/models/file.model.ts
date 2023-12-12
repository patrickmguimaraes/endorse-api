import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import ActivationDate from "./activation-date.model";
import User from "./user.model";

@Table({
  tableName: "files",
})
export default class File extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    field: "path"
  })
  path?: string;

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
  })
  endorseId!: number;

  @BelongsTo(() => Endorse)
  endorse?: Endorse;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
