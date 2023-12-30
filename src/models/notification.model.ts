import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestActivationDate from "./request-copyright-activation-date.model";
import User from "./user.model";

@Table({timestamps: false,
  tableName: "notifications",
})
export default class Notification extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(150),
    field: "title"
  })
  title?: string;

  @Column({
    type: DataType.STRING(200),
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.STRING(200),
    field: "image"
  })
  image?: string;

  @Column({
    type: DataType.STRING(200),
    field: "link"
  })
  link?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "read"
  })
  read?: string;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId"
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}