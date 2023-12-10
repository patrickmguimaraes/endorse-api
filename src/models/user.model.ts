import { Model, Table, Column, DataType, HasOne, ForeignKey } from "sequelize-typescript";
import Contract from "./contract.model";
import Person from "./person.model";
import Company from "./company.model";

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

  @HasOne(() => Person, { foreignKey: 'userId', sourceKey: 'id' })
  person?: Person;

  @HasOne(() => Company, { foreignKey: 'userId', sourceKey: 'id' })
  company?: Company;

  @HasOne(() => Contract, { foreignKey: 'userId', sourceKey: 'id' })
  contract?: Contract;

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
}
