import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Post from "./post.model";

@Table({timestamps: false,
  tableName: "ideas",
})
export default class Idea extends Model {
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

  @HasOne(() => Post, { foreignKey: 'ideaId', sourceKey: 'id' })
  post?: Post;
}
