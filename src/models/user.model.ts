import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import Person from "./person.model";
import Company from "./company.model";
import Request from "./request-copyright.model";
import RequestCopyrightAssignment from "./request-copyright-assignment.model";
import File from "./file.model";
import RequestCopyrightHistory from "./request-copyright-history.model";
import Token from "./token.model";
import Like from "./power.model";
import Comment from "./comment.model";
import Post from "./post.model";
import Follower from "./follower.model";
import View from "./view.model";
import EndorseView from "./endorse-view.model";
import UserAgreement from "./user-agreement.model";
import UserSettings from "./user-settings.model";
import CollaborationRequest from "./collaboration-request.model";
import Notification from "./notification.model";
import RequestCopyright from "./request-copyright.model";

@Table({timestamps: false,
  tableName: "users",
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(5),
    field: "role"
  })
  role?: string;

  @Column({
    type: DataType.STRING(100),
    field: "username"
  })
  username?: string;
  
  @Column({
    type: DataType.STRING(100),
    field: "email"
  })
  email?: string;

  @Column({
    type: DataType.STRING(100),
    field: "password"
  })
  password?: string;

  @Column({
    type: DataType.STRING(10),
    field: "type"
  })
  type?: string;

  @Column({
    type: DataType.STRING(20),
    field: "phone"
  })
  phone?: string;

  @Column({
    type: DataType.STRING(100),
    field: "streetLine1"
  })
  streetLine1?: string;

  @Column({
    type: DataType.STRING(100),
    field: "streetLine2"
  })
  streetLine2?: string;

  @Column({
    type: DataType.STRING(50),
    field: "country"
  })
  country?: string;

  @Column({
    type: DataType.STRING(50),
    field: "state"
  })
  state?: string;

  @Column({
    type: DataType.STRING(50),
    field: "city"
  })
  city?: string;

  @Column({
    type: DataType.STRING(15),
    field: "postalCode"
  })
  postalCode?: string;

  @Column({
    type: DataType.STRING(255),
    field: "linkedin"
  })
  linkedin?: string;

  @Column({
    type: DataType.STRING(255),
    field: "facebook"
  })
  facebook?: string;

  @Column({
    type: DataType.STRING(255),
    field: "instagram"
  })
  instagram?: string;

  @Column({
    type: DataType.STRING(255),
    field: "x"
  })
  x?: string;

  @Column({
    type: DataType.STRING(5),
    field: "language"
  })
  language?: string;

  @Column({
    type: DataType.STRING(255),
    field: "location"
  })
  location?: string;

  @Column({
    type: DataType.STRING(255),
    field: "notification"
  })
  notification?: string;

  @Column({
    type: DataType.STRING(15),
    field: "signupProvider"
  })
  signupProvider?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "isEmailVerified",
  })
  isEmailVerified?: boolean;

  @Column({
    type: DataType.STRING(10),
    field: "status"
  })
  status?: string;

  @Column({
    type: DataType.DATE,
    field: "date"
  })
  date?: Date;

  @Column({
    type: DataType.DATE,
    field: "removed"
  })
  removed?: Date;

  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER,
    field: "personId",
  })
  personId!: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    field: "companyId",
  })
  companyId!: number;

  @BelongsTo(() => Person)
  person?: Person;

  @BelongsTo(() => Company)
  company?: Company;
  
  @HasMany(() => Request, { foreignKey: 'userId', sourceKey: 'id' })
  requests?: Request[];

  @HasMany(() => RequestCopyrightAssignment, { foreignKey: 'userId', sourceKey: 'id' })
  requestAssignments?: RequestCopyrightAssignment[];

  @HasOne(() => UserSettings, { foreignKey: 'userId', sourceKey: 'id' })
  settings?: UserSettings;
  
  @HasMany(() => File, { foreignKey: 'userId', sourceKey: 'id' })
  files?: File[];

  @HasMany(() => RequestCopyrightHistory, { foreignKey: 'userId', sourceKey: 'id' })
  requestHistory?: RequestCopyrightHistory[];

  @HasMany(() => UserAgreement, { foreignKey: 'userId', sourceKey: 'id' })
  userAgreements?: UserAgreement[];

  @HasMany(() => Token, { foreignKey: 'userId', sourceKey: 'id' })
  tokens?: Token[];

  @HasMany(() => Like, { foreignKey: 'userId', sourceKey: 'id' })
  likes?: Like[];

  @HasMany(() => Comment, { foreignKey: 'userId', sourceKey: 'id' })
  comments?: Comment[];

  @HasMany(() => RequestCopyright, { foreignKey: 'userId', sourceKey: 'id' })
  requestments?: RequestCopyright[];

  @HasMany(() => Post, { foreignKey: 'userId', sourceKey: 'id' })
  posts?: Post[];

  @HasMany(() => Follower, { foreignKey: 'followerId', sourceKey: 'id' })
  followers?: Follower[];
  
  @HasMany(() => Follower, { foreignKey: 'followedId', sourceKey: 'id' })
  followeds?: Follower[];

  @HasMany(() => View, { foreignKey: 'userId', sourceKey: 'id' })
  views?: View[];

  @HasMany(() => EndorseView, { foreignKey: 'userId', sourceKey: 'id' })
  endorseViews?: EndorseView[];

  @HasMany(() => CollaborationRequest, { foreignKey: 'userId', sourceKey: 'id' })
  collaborationRequests?: CollaborationRequest[];

  @HasMany(() => Notification, { foreignKey: 'userId', sourceKey: 'id' })
  notifications?: Notification[];
}
