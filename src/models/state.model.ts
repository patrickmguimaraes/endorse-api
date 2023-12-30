import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Country from "./country.model";
import Location from "./city.model";
import City from "./city.model";

@Table({timestamps: false,
  tableName: "states",
})
export default class State extends Model {
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
    field: "stateCode"
  })
  stateCode?: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    field: "countryId"
  })
  countryId!: number;

  @BelongsTo(() => Country)
  country?: Country;

  @HasMany(() => City, { foreignKey: 'stateId', sourceKey: 'id' })
  cities?: City[];
}