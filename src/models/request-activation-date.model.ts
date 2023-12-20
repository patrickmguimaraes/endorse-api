import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import ActivationDate from "./activation-date.model";

@Table({
  tableName: "requestActivationDates",
})
export default class RequestActivationDate extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @ForeignKey(() => Request)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => Request)
  request?: Request;

  @ForeignKey(() => ActivationDate)
  @Column({
    type: DataType.INTEGER,
    field: "activationDateId",
  })
  activationDateId!: number;

  @BelongsTo(() => ActivationDate)
  activationDate?: ActivationDate;
}
