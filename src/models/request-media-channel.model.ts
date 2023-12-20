import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Request from "./request.model";
import MediaChannel from "./media-channel.model";

@Table({
  tableName: "requestMediaChannels",
})
export default class RequestMediaChannel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Request)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => Request)
  request?: Request;

  @ForeignKey(() => MediaChannel)
  @Column({
    type: DataType.INTEGER,
    field: "mediaChannelId",
  })
  mediaChannelId!: number;

  @BelongsTo(() => MediaChannel)
  mediaChannel?: MediaChannel;
}
