import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import User from "./user.model";

@Table({
  tableName: "companies",
})
export default class Company extends Model {
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

  @Column({
    type: DataType.STRING(100),
    field: "businessIndustry"
  })
  businessIndustry?: string;

  @Column({
    type: DataType.STRING(100),
    field: "businessLocation"
  })
  businessLocation?: string;

  @Column({
    type: DataType.STRING(100),
    field: "businessWebsite"
  })
  businessWebsite?: string;

  @Column({
    type: DataType.STRING(50),
    field: "businessSize"
  })
  businessSize?: string;

  @HasOne(() => User, { foreignKey: 'companyId', sourceKey: 'id' })
  user?: User;
}
