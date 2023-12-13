import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import Person from "./person.model";
import Company from "./company.model";
import Endorse from "./endorse.model";
import EndorseAssignment from "./endorse-assignment.model";
import File from "./file.model";
import EndorseHistory from "./endorse-history.model";

@Table({
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
    type: DataType.STRING(100),
    field: "authId"
  })
  authId?: string;

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
    type: DataType.STRING(255),
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

  @ForeignKey(() => Contract)
  @Column({
    type: DataType.INTEGER,
    field: "contractId",
  })
  contractId!: number;

  @BelongsTo(() => Person)
  person?: Person;

  @BelongsTo(() => Company)
  company?: Company;

  @BelongsTo(() => Contract)
  contract?: Contract;
  
  @HasMany(() => Endorse, { foreignKey: 'userId', sourceKey: 'id' })
  endorsements?: Endorse[];

  @HasMany(() => EndorseAssignment, { foreignKey: 'userId', sourceKey: 'id' })
  endorseAssignments?: EndorseAssignment[];

  @HasMany(() => File, { foreignKey: 'userId', sourceKey: 'id' })
  files?: File[];

  @HasMany(() => EndorseHistory, { foreignKey: 'userId', sourceKey: 'id' })
  endorseHistory?: EndorseHistory[];
}
