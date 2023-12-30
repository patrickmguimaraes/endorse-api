import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Company from "./company.model";
import State from "./state.model";
import Address from "./address.model";

@Table({timestamps: false,
  tableName: "cities",
})
export default class City extends Model {
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
    field: "latitude"
  })
  latitude?: string;

  @Column({
    type: DataType.STRING,
    field: "longitude"
  })
  longitude?: string;

  @Column({
    type: DataType.STRING,
    field: "wikiDataId"
  })
  wikiDataId?: string;

  @ForeignKey(() => State)
  @Column({
    type: DataType.INTEGER,
    field: "stateId"
  })
  stateId!: number;

  @BelongsTo(() => State)
  state?: State;

  @HasMany(() => Address, { foreignKey: 'cityId', sourceKey: 'id' })
  addresses?: Address[];

  @HasMany(() => Company, { foreignKey: 'cityId', sourceKey: 'id' })
  companies?: Company[];
}