import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";

@Table({timestamps: false,
  tableName: "userSettings",
})
export default class UserSettings extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.BOOLEAN,
    field: "newsletter"
  })
  newsletter?: Date;

  @Column({
    type: DataType.BOOLEAN,
    field: "notifications"
  })
  emailNotifications?: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
