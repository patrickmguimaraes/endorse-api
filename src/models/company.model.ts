import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Category from "./category.model";
import Copyright from "./copyright.model";
import Industry from "./industry.model";
import City from "./city.model";
import RequestCopyright from "./request-copyright.model";

@Table({timestamps: false,
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
    type: DataType.TEXT,
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    field: "handle"
  })
  handle?: string;

  @Column({
    type: DataType.STRING,
    field: "founded"
  })
  founded?: string;

  @Column({
    type: DataType.STRING,
    field: "website"
  })
  website?: string;

  @Column({
    type: DataType.STRING,
    field: "size"
  })
  size?: string;

  @Column({
    type: DataType.TEXT,
    field: "summary"
  })
  summary?: string;

  @Column({
    type: DataType.STRING(400),
    field: "linkedin"
  })
  linkedin?: string;

  @Column({
    type: DataType.STRING(400),
    field: "facebook"
  })
  facebook?: string;

  @Column({
    type: DataType.STRING(400),
    field: "twitter"
  })
  twitter?: string;

  @ForeignKey(() => Industry)
  @Column({
    type: DataType.INTEGER,
    field: "industryId"
  })
  industryId!: number;

  @BelongsTo(() => Industry)
  industry?: Industry;

  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
    field: "cityId"
  })
  cityId!: number;

  @BelongsTo(() => City)
  city?: City;

  @HasOne(() => User, { foreignKey: 'companyId', sourceKey: 'id' })
  user?: User;

  @HasMany(() => Copyright, { foreignKey: 'companyId', sourceKey: 'id' })
  copyrights?: Copyright[];

  @HasMany(() => RequestCopyright, { foreignKey: 'companyId', sourceKey: 'id' })
  requests?: RequestCopyright[];
}
