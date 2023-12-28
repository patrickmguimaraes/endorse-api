import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import User from "./user.model";
import Post from "./post.model";
import Showcase from "./showcase.model";
import CollaborationRequest from "./collaboration-request.model";

@Table({timestamps: false,
  tableName: "files",
})
export default class File extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(50),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING(10),
    field: "type"
  })
  type?: string;

  @Column({
    type: DataType.STRING,
    field: "path",
    allowNull: true
  })
  path?: string;

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
  
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @ForeignKey(() => Showcase)
  @Column({
    type: DataType.INTEGER,
    field: "showcaseId",
  })
  showcaseId!: number;

  @BelongsTo(() => Showcase)
  showcase?: Showcase;

  @ForeignKey(() => CollaborationRequest)
  @Column({
    type: DataType.INTEGER,
    field: "collaborationRequestId",
  })
  collaborationRequestId!: number;

  @BelongsTo(() => CollaborationRequest)
  collaborationRequest?: CollaborationRequest;
}
