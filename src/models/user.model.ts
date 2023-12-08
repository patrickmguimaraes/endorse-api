import { Model, Table, Column, DataType, HasOne, ForeignKey } from "sequelize-typescript";
import Contract from "./contract.model";

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
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING(50),
    field: "surname"
  })
  surname?: string;

  @Column({
    type: DataType.DATE,
    field: "birth"
  })
  birth?: Date;
  
  @Column({
    type: DataType.STRING(30),
    field: "gender"
  })
  gender?: string;

  @Column({
    type: DataType.STRING(50),
    field: "profession"
  })
  profession?: string;

  @Column({
    type: DataType.STRING(20),
    field: "phone"
  })
  phone?: string;

  @Column({
    type: DataType.STRING(100),
    field: "businessIndustry"
  })
  businessIndustry?: string;

  @Column({
    type: DataType.STRING(100),
    field: "businessLocation"
  })
  businessLocation?: string;

  @Column({
    type: DataType.STRING(100),
    field: "businessWebsite"
  })
  businessWebsite?: string;

  @Column({
    type: DataType.STRING(50),
    field: "businessSize"
  })
  businessSize?: string;

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
    type: DataType.STRING(15),
    field: "postalCode"
  })
  postalCode?: string;

  @Column({
    type: DataType.STRING(30),
    field: "exploreOption"
  })
  exploreOption?: string;

  @HasOne(() => Contract, { foreignKey: 'contractId' })
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
