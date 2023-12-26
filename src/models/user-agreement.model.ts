import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Agreement from "./agreement.model";

@Table({timestamps: false,
  tableName: "userAgreements",
})
export default class UserAgreement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @ForeignKey(() => Agreement)
  @Column({
    type: DataType.INTEGER,
    field: "agreementId",
  })
  agreementId!: number;

  @BelongsTo(() => Agreement)
  agreement?: Agreement;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
