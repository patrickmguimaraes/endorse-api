import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import ActivationDate from "./activation-date.model";

@Table({
  tableName: "endorseActivationDates",
})
export default class EndorseActivationDate extends Model {
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

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
  })
  endorseId!: number;

  @BelongsTo(() => Endorse)
  endorse?: Endorse;

  @ForeignKey(() => ActivationDate)
  @Column({
    type: DataType.INTEGER,
    field: "activationDateId",
  })
  activationDateId!: number;

  @BelongsTo(() => ActivationDate)
  activationDate?: ActivationDate;
}
