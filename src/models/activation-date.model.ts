import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestActivationDate from "./request-activation-date.model";

@Table({timestamps: false,
  tableName: "activationDates",
})
export default class ActivationDate extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(50),
    field: "name"
  })
  name?: string;

  @HasMany(() => RequestActivationDate, { foreignKey: 'activationDateId', sourceKey: 'id' })
  requestActivationDates?: RequestActivationDate[];
}