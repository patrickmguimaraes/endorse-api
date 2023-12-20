import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import RequestMediaChannel from "./request-media-channel.model";

@Table({
  tableName: "mediaChannels",
})
export default class MediaChannel extends Model {
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

  @HasMany(() => RequestMediaChannel, { foreignKey: 'mediaChannelId', sourceKey: 'id' })
  requestMediaChannels?: RequestMediaChannel[];
}
