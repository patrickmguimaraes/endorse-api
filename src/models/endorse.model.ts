import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import User from "./user.model";
import Category from "./category.model";
import EndorseActivationDate from "./endorse-activation-date.model";
import EndorseComplianceMeasure from "./endorse-compliance-measure.model";
import EndorseContentElement from "./endorse-content-element.model";
import EndorseGeograficScope from "./endorse-geografic-scope.model";
import EndorseMediaChannel from "./endorse-media-channel.model";
import EndorseMetric from "./endorse-metric.model";
import EndorseAssignment from "./endorse-assignment.model";
import File from "./file.model";
import EndorseHistory from "./endorse-history.model";

@Table({
  tableName: "endorses",
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
    type: DataType.STRING(100),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.TEXT,
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.TEXT,
    field: "objective"
  })
  objective?: string;

  @Column({
    type: DataType.STRING(10),
    field: "start"
  })
  start?: string;

  @Column({
    type: DataType.STRING(10),
    field: "end"
  })
  end?: string;

  @Column({
    type: DataType.DATE,
    field: "startDate"
  })
  startDate?: string;

  @Column({
    type: DataType.DATE,
    field: "endDate"
  })
  endDate?: string;

  @Column({
    type: DataType.STRING(200),
    field: "attributionDetails"
  })
  attributionDetails?: string;

  @Column({
    type: DataType.STRING(200),
    field: "reportingFrequency"
  })
  reportingFrequency?: string;

  @Column({
    type: DataType.TEXT,
    field: "requestText"
  })
  requestText?: string;

  @Column({
    type: DataType.STRING(10),
    field: "visibility"
  })
  visibility?: string;
 
  @Column({
    type: DataType.STRING(300),
    field: "picture"
  })
  picture?: string;

  @Column({
    type: DataType.STRING(30),
    field: "status"
  })
  status?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
  })
  userId!: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: "categoryId",
  })
  categoryId!: number;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Category)
  category?: Category;

  @HasMany(() => EndorseActivationDate, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseActivationDates?: EndorseActivationDate[];

  @HasMany(() => EndorseComplianceMeasure, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseComplianceMeasures?: EndorseComplianceMeasure[];

  @HasMany(() => EndorseContentElement, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseContentElements?: EndorseContentElement[];

  @HasMany(() => EndorseGeograficScope, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseGeograficScopes?: EndorseGeograficScope[];

  @HasMany(() => EndorseMediaChannel, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseMediasChannels?: EndorseMediaChannel[];

  @HasMany(() => EndorseMetric, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseMetrics?: EndorseMetric[];

  @HasMany(() => EndorseAssignment, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseAssignments?: EndorseAssignment[];

  @HasMany(() => File, { foreignKey: 'endorseId', sourceKey: 'id' })
  files?: File[];

  @HasMany(() => EndorseHistory, { foreignKey: 'endorseId', sourceKey: 'id' })
  endorseHistory?: EndorseHistory[];
}