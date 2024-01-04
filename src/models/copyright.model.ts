import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Company from "./company.model";
import Request from "./request-copyright.model";

@Table({timestamps: false,
  tableName: "copyrights",
})
export default class Copyright extends Model {
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
    type: DataType.TEXT,
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "visibleToAllPeople"
  })
  visibleToAllPeople?: boolean;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    field: "companyId",
  })
  companyId!: number;

  @BelongsTo(() => Company)
  company?: Company;

  @HasMany(() => Request, { foreignKey: 'copyrightId', sourceKey: 'id' })
  requests?: Request[];
}
