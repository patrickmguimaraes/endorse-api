import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestCopyright from "./request-copyright.model";
import MediaChannel from "./media-channel.model";

@Table({timestamps: false,
  tableName: "requestCopyrightMediaChannels",
})
export default class RequestCopyrightMediaChannel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => RequestCopyright)
  @Column({
    type: DataType.INTEGER,
    field: "requestId",
  })
  requestId!: number;

  @BelongsTo(() => RequestCopyright)
  request?: RequestCopyright;

  @ForeignKey(() => MediaChannel)
  @Column({
    type: DataType.INTEGER,
    field: "mediaChannelId",
  })
  mediaChannelId!: number;

  @BelongsTo(() => MediaChannel)
  mediaChannel?: MediaChannel;
}
