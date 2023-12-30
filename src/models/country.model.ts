import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import State from "./state.model";

@Table({timestamps: false,
  tableName: "countries",
})
export default class Country extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    //autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    field: "iso"
  })
  iso?: string;

  @Column({
    type: DataType.STRING,
    field: "iso3"
  })
  iso3?: string;

  @Column({
    type: DataType.STRING,
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    field: "nativeName"
  })
  nativeName?: string;

  @Column({
    type: DataType.STRING,
    field: "numcode"
  })
  numcode?: string;

  @Column({
    type: DataType.STRING,
    field: "phonecode"
  })
  phonecode?: string;

  @Column({
    type: DataType.STRING,
    field: "capital"
  })
  capital?: string;

  @Column({
    type: DataType.STRING,
    field: "region"
  })
  region?: string;

  @Column({
    type: DataType.STRING,
    field: "subRegion"
  })
  subRegion?: string;

  @Column({
    type: DataType.STRING,
    field: "currencyName"
  })
  currencyName?: string;

  @Column({
    type: DataType.STRING,
    field: "currency"
  })
  currency?: string;

  @Column({
    type: DataType.STRING,
    field: "currencySymbol"
  })
  currencySymbol?: string;

  @Column({
    type: DataType.STRING,
    field: "nationality"
  })
  nationality?: string;

  @Column({
    type: DataType.STRING,
    field: "emojiU"
  })
  emojiU?: string;

  @Column({
    type: DataType.STRING,
    field: "tld"
  })
  tld?: string;

  @HasMany(() => State, { foreignKey: 'countryId', sourceKey: 'id' })
  states?: State[];
}