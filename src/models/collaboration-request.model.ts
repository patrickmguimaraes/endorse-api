import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import File from "./file.model";
import Collaboration from "./collaboration.model";

@Table({timestamps: false,
  tableName: "collaborationRequests",
})
export default class CollaborationRequest extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(150),
    field: "contact"
  })
  contact?: string;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Collaboration)
  @Column({
    type: DataType.INTEGER,
    field: "collaborationId",
  })
  collaborationId!: number;

  @BelongsTo(() => Collaboration)
  collaboration?: Collaboration;

  @HasOne(() => File, { foreignKey: 'collaborationRequestId', sourceKey: 'id' })
  file?: File;

  @Column({
    type: DataType.STRING(10),
    field: "status"
  })
  status?: string;
}