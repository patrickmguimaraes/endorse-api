import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Showcase from "./showcase.model";

@Table({timestamps: false,
  tableName: "tags",
})
export default class Tag extends Model {
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

  @ForeignKey(() => Showcase)
  @Column({
    type: DataType.INTEGER,
    field: "showcaseId",
  })
  showcaseId!: number;

  @BelongsTo(() => Showcase)
  showcase?: Showcase;
}