import { Model, Table, Column, DataType, HasOne } from "sequelize-typescript";
import Post from "./post.model";

@Table({
  tableName: "articles",
})
export default class Article extends Model {
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

  @Column({
    type: DataType.TEXT('long'),
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.STRING(100),
    field: "title"
  })
  title?: string;

  @Column({
    type: DataType.STRING(200),
    field: "subject"
  })
  subject?: string;

  @Column({
    type: DataType.STRING(100),
    field: "author"
  })
  author?: string;

  @HasOne(() => Post, { foreignKey: 'articleId', sourceKey: 'id' })
  post?: Post;
}
