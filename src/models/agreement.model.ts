import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import UserAgreement from "./user-agreement.model";

@Table({timestamps: false,
  tableName: "agreements",
})
export default class Agreement extends Model {
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
    type: DataType.TEXT,
    field: "text"
  })
  text?: Date;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @Column({
    type: DataType.STRING(20),
    field: "type"
  })
  type?: string;

  @Column({
    type: DataType.STRING(10),
    field: "status"
  })
  status?: string;

  @HasMany(() => UserAgreement, { foreignKey: 'agreementId', sourceKey: 'id' })
  userTermsAndConditions?: UserAgreement[];
}
