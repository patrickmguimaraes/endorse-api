import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestCopyright from "./request-copyright.model";
import ActivationDate from "./activation-date.model";

@Table({timestamps: false,
  tableName: "requestCopyrightActivationDates",
})
export default class RequestCopyrightActivationDate extends Model {
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

  @ForeignKey(() => RequestCopyright)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => RequestCopyright)
  request?: RequestCopyright;

  @ForeignKey(() => ActivationDate)
  @Column({
    type: DataType.INTEGER,
    field: "activationDateId",
  })
  activationDateId!: number;

  @BelongsTo(() => ActivationDate)
  activationDate?: ActivationDate;
}
