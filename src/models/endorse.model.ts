import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";

@Table({timestamps: false,
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
    type: DataType.STRING(7),
    field: "status"
  })
  status?: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
  })
  endorsementId!: number;

  @BelongsTo(() => Endorse)
  endorsement?: Endorse;

  @HasMany(() => Endorse, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorsements?: Endorse[];
}
