import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Endorse from "./endorse.model";
import MediaChannel from "./media-channel.model";

@Table({
  tableName: "endorseMediaChannels",
})
export default class EndorseMediaChannel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Endorse)
  @Column({
    type: DataType.INTEGER,
    field: "endorseId",
  })
  endorseId!: number;

  @BelongsTo(() => Endorse)
  endorse?: Endorse;

  @ForeignKey(() => MediaChannel)
  @Column({
    type: DataType.INTEGER,
    field: "mediaChannelId",
  })
  mediaChannelId!: number;

  @BelongsTo(() => MediaChannel)
  mediaChannel?: MediaChannel;
}
