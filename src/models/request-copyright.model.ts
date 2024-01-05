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
import Company from "./company.model";
import Post from "./post.model";

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
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

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
    type: DataType.DATE,
    field: "start"
  })
  start?: string;

  @Column({
    type: DataType.DATE,
    field: "end"
  })
  end?: string;

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
    type: DataType.STRING(10),
    field: "visibility"
  })
  visibility?: string;

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

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Copyright)
  @Column({
    type: DataType.INTEGER,
    field: "copyrightId",
  })
  copyrightId!: number;

  @BelongsTo(() => Copyright)
  copyright?: Copyright;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    field: "companyId",
  })
  companyId!: number;

  @BelongsTo(() => Company)
  company?: Company;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

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