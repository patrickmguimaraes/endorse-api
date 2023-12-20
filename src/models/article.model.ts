import { Model, Table, Column, DataType, HasOne } from "sequelize-typescript";
import Post from "./post.model";

@Table({timestamps: false,
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
    field: "date",
    allowNull: true
  })
  date?: Date;

  @Column({
    type: DataType.TEXT,
    field: "text",
    allowNull: true
  })
  text?: string;

  @Column({
    type: DataType.STRING,
    field: "title",
    allowNull: true
  })
  title?: string;

  @Column({
    type: DataType.STRING,
    field: "subject",
    allowNull: true
  })
  subject?: string;

  @Column({
    type: DataType.STRING(100),
    field: "author",
    allowNull: true
  })
  author?: string;

  @HasOne(() => Post, { foreignKey: 'articleId', sourceKey: 'id' })
  post?: Post;
}
