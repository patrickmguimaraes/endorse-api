import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";

@Table({
  tableName: "endorsements",
})
export default class Endorsement extends Model {
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

  @ForeignKey(() => Endorsement)
  @Column({
    type: DataType.INTEGER,
    field: "endorsementId",
  })
  endorsementId!: number;

  @BelongsTo(() => Endorsement)
  endorsement?: Endorsement;

  @HasMany(() => Endorsement, { foreignKey: 'endorsementId', sourceKey: 'id' })
  endorsements?: Endorsement[];
}
