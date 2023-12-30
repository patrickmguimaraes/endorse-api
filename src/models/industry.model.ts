import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Company from "./company.model";

@Table({timestamps: false,
  tableName: "industries",
})
export default class Industry extends Model {
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

  @HasMany(() => Company, { foreignKey: 'industryId', sourceKey: 'id' })
  companies?: Company[];
}