import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import EndorseActivationDate from "./endorse-activation-date.model";

@Table({
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

  @HasMany(() => EndorseActivationDate, { foreignKey: 'activationDateId', sourceKey: 'id' })
  endorseActivationDates?: EndorseActivationDate[];
}