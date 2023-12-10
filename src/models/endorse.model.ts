import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import User from "./user.model";
import Category from "./category.model";

@Table({
  tableName: "endorsements",
})
export default class Endorse extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(100),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING(200),
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.STRING(200),
    field: "objective"
  })
  objective?: string;

  @Column({
    type: DataType.STRING(10),
    field: "start"
  })
  start?: string;

  @Column({
    type: DataType.STRING(10),
    field: "end"
  })
  end?: string;

  @Column({
    type: DataType.DATE,
    field: "startDate"
  })
  startDate?: string;

  @Column({
    type: DataType.DATE,
    field: "endDate"
  })
  endDate?: string;

  @Column({
    type: DataType.STRING(200),
    field: "attributionDetails"
  })
  attributionDetails?: string;

  @Column({
    type: DataType.STRING(200),
    field: "reportingFrequency"
  })
  reportingFrequency?: string;

  @Column({
    type: DataType.TEXT,
    field: "requestText"
  })
  requestText?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: "categoryId",
  })
  categoryId!: number;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Category)
  category?: Category;
}