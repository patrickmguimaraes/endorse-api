import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import User from "./user.model";

@Table({timestamps: false,
  tableName: "requestAssignments",
})
export default class RequestAssignment extends Model {
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

  @Column({
    type: DataType.STRING,
    field: "email"
  })
  email?: string;

  @Column({
    type: DataType.STRING(10),
    field: "permission"
  })
  permission?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "canBeRemoved"
  })
  canBeRemoved?: string;

  @ForeignKey(() => Request)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => Request)
  request?: Request;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
