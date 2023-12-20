import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Category from "./category.model";
import RequestActivationDate from "./request-activation-date.model";
import RequestComplianceMeasure from "./request-compliance-measure.model";
import RequestContentElement from "./request-content-element.model";
import RequestGeograficScope from "./request-geografic-scope.model";
import RequestMediaChannel from "./request-media-channel.model";
import RequestMetric from "./request-metric.model";
import RequestAssignment from "./request-assignment.model";
import File from "./file.model";
import RequestHistory from "./request-history.model";
import Copyright from "./copyright.model";

@Table({timestamps: false,
  tableName: "requests",
})
export default class Request extends Model {
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

  @ForeignKey(() => Copyright)
  @Column({
    type: DataType.INTEGER,
    field: "copyrightId",
  })
  copyrightId!: number;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Copyright)
  category?: Copyright;

  @HasMany(() => RequestActivationDate, { foreignKey: 'requestId', sourceKey: 'id' })
  requestActivationDates?: RequestActivationDate[];

  @HasMany(() => RequestComplianceMeasure, { foreignKey: 'requestId', sourceKey: 'id' })
  requestComplianceMeasures?: RequestComplianceMeasure[];

  @HasMany(() => RequestContentElement, { foreignKey: 'requestId', sourceKey: 'id' })
  requestContentElements?: RequestContentElement[];

  @HasMany(() => RequestGeograficScope, { foreignKey: 'requestId', sourceKey: 'id' })
  requestGeograficScopes?: RequestGeograficScope[];

  @HasMany(() => RequestMediaChannel, { foreignKey: 'requestId', sourceKey: 'id' })
  requestMediasChannels?: RequestMediaChannel[];

  @HasMany(() => RequestMetric, { foreignKey: 'requestId', sourceKey: 'id' })
  requestMetrics?: RequestMetric[];

  @HasMany(() => RequestAssignment, { foreignKey: 'requestId', sourceKey: 'id' })
  requestAssignments?: RequestAssignment[];

  @HasMany(() => File, { foreignKey: 'requestId', sourceKey: 'id' })
  files?: File[];

  @HasMany(() => RequestHistory, { foreignKey: 'requestId', sourceKey: 'id' })
  requestHistory?: RequestHistory[];
}