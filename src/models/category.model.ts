import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Company from "./company.model";

@Table({timestamps: false,
  tableName: "categories",
})
export default class Category extends Model {
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

  @HasMany(() => Company, { foreignKey: 'categoryId', sourceKey: 'id' })
  companies?: Company[];
}