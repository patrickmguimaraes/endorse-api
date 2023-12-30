import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Company from "./company.model";
import State from "./state.model";
import City from "./city.model";

@Table({timestamps: false,
  tableName: "addresses",
})
export default class Address extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    field: "postalCode"
  })
  postalCode?: string;

  @Column({
    type: DataType.STRING,
    field: "street_address"
  })
  streetAddress?: string;

  @Column({
    type: DataType.STRING,
    field: "address_line_2"
  })
  addressLine2?: string;

  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
    field: "cityId"
  })
  cityId!: number;

  @BelongsTo(() => City)
  city?: City;

  @HasMany(() => Company, { foreignKey: 'addressId', sourceKey: 'id' })
  companies?: Company[];
}