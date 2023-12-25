import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";
import View from "./view.model";
import EndorseView from "./endorse-view.model";

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
    type: DataType.STRING(500),
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.STRING(7),
    field: "status"
  })
  status?: string;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

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
    field: "fatherId",
    allowNull: true
  })
  fatherId!: number;

  @BelongsTo(() => Endorse)
  father?: Endorse;

  @HasMany(() => Endorse, { foreignKey: 'fatherId', sourceKey: 'id' })
  children?: Endorse[];

  @HasMany(() => EndorseView, { foreignKey: 'endorseId', sourceKey: 'id' })
  views?: EndorseView[];
}
