import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Category from "./category.model";
import RequestCopyrightActivationDate from "./request-copyright-activation-date.model";
import RequestCopyrightComplianceMeasure from "./request-copyright-compliance-measure.model";
import RequestCopyrightContentElement from "./request-copyright-content-element.model";
import RequestCopyrightGeograficScope from "./request-copyright-geografic-scope.model";
import RequestCopyrightMediaChannel from "./request-copyright-media-channel.model";
import RequestCopyrightMetric from "./request-copyright-metric.model";
import RequestCopyrightAssignment from "./request-copyright-assignment.model";
import File from "./file.model";
import RequestCopyrightHistory from "./request-copyright-history.model";
import Copyright from "./copyright.model";

@Table({timestamps: false,
  tableName: "requestCopyrights",
})
export default class RequestCopyright extends Model {
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

  @HasMany(() => RequestCopyrightActivationDate, { foreignKey: 'requestId', sourceKey: 'id' })
  requestActivationDates?: RequestCopyrightActivationDate[];

  @HasMany(() => RequestCopyrightComplianceMeasure, { foreignKey: 'requestId', sourceKey: 'id' })
  requestComplianceMeasures?: RequestCopyrightComplianceMeasure[];

  @HasMany(() => RequestCopyrightContentElement, { foreignKey: 'requestId', sourceKey: 'id' })
  requestContentElements?: RequestCopyrightContentElement[];

  @HasMany(() => RequestCopyrightGeograficScope, { foreignKey: 'requestId', sourceKey: 'id' })
  requestGeograficScopes?: RequestCopyrightGeograficScope[];

  @HasMany(() => RequestCopyrightMediaChannel, { foreignKey: 'requestId', sourceKey: 'id' })
  requestMediasChannels?: RequestCopyrightMediaChannel[];

  @HasMany(() => RequestCopyrightMetric, { foreignKey: 'requestId', sourceKey: 'id' })
  requestMetrics?: RequestCopyrightMetric[];

  @HasMany(() => RequestCopyrightAssignment, { foreignKey: 'requestId', sourceKey: 'id' })
  requestAssignments?: RequestCopyrightAssignment[];

  @HasMany(() => File, { foreignKey: 'requestId', sourceKey: 'id' })
  files?: File[];

  @HasMany(() => RequestCopyrightHistory, { foreignKey: 'requestId', sourceKey: 'id' })
  requestHistory?: RequestCopyrightHistory[];
}