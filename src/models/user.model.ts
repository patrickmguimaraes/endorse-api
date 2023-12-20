import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import Person from "./person.model";
import Company from "./company.model";
import Request from "./request.model";
import RequestAssignment from "./request-assignment.model";
import File from "./file.model";
import RequestHistory from "./request-history.model";
import UserTermAndCondition from "./user-term-and-condition.model";
import Token from "./token.model";
import Like from "./power.model";
import Comment from "./comment.model";
import Requestment from "./request.model";
import Post from "./post.model";
import Follower from "./follower.model";
import View from "./view.model";

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

  @HasMany(() => RequestAssignment, { foreignKey: 'userId', sourceKey: 'id' })
  requestAssignments?: RequestAssignment[];

  @HasMany(() => File, { foreignKey: 'userId', sourceKey: 'id' })
  files?: File[];

  @HasMany(() => RequestHistory, { foreignKey: 'userId', sourceKey: 'id' })
  requestHistory?: RequestHistory[];

  @HasMany(() => UserTermAndCondition, { foreignKey: 'userId', sourceKey: 'id' })
  userTermsAndConditions?: UserTermAndCondition[];

  @HasMany(() => Token, { foreignKey: 'userId', sourceKey: 'id' })
  tokens?: Token[];

  @HasMany(() => Like, { foreignKey: 'userId', sourceKey: 'id' })
  likes?: Like[];

  @HasMany(() => Comment, { foreignKey: 'userId', sourceKey: 'id' })
  comments?: Comment[];

  @HasMany(() => Requestment, { foreignKey: 'userId', sourceKey: 'id' })
  requestments?: Requestment[];

  @HasMany(() => Post, { foreignKey: 'userId', sourceKey: 'id' })
  posts?: Post[];

  @HasMany(() => Follower, { foreignKey: 'followerId', sourceKey: 'id' })
  followers?: Follower[];
  
  @HasMany(() => Follower, { foreignKey: 'followedId', sourceKey: 'id' })
  followeds?: Follower[];

  @HasMany(() => View, { foreignKey: 'userId', sourceKey: 'id' })
  views?: View[];
}
