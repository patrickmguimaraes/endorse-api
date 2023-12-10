import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import User from "../models/user.model";
import Contract from "../models/contract.model";
import Company from "../models/company.model";
import Person from "../models/person.model";
import ActivationDate from "../models/activation-date.model";
import Category from "../models/category.model";
import ComplianceMeasure from "../models/compliance-measure.model";
import ContentElement from "../models/content-element.model";
import Copyright from "../models/copyright.model";
import Endorse from "../models/endorse.model";
import EndorseActivationDate from "../models/endorse-activation-date.model";
import EndorseComplianceMeasure from "../models/endorse-compliance-measure.model";
import EndorseContentElement from "../models/endorse-content-element.model";
import EndorseGeograficScope from "../models/endorse-geografic-scope.model";
import EndorseMediaChannel from "../models/endorse-media-channel.model";
import EndorseMetric from "../models/endorse-metric.model";
import GeograficScope from "../models/geografic-scope.model";
import MediaChannel from "../models/media-channel.model";
import Metric from "../models/metric.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      models: [
        User,
        Contract,
        Company,
        Person,
        ActivationDate,
        Category,
        ComplianceMeasure,
        ContentElement,
        Copyright,
        Endorse,
        EndorseActivationDate,
        EndorseComplianceMeasure,
        EndorseContentElement,
        EndorseGeograficScope,
        EndorseMediaChannel,
        EndorseMetric,
        GeograficScope,
        MediaChannel,
        Metric
      ]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }

  public sync() {
    User.hasMany(Endorse, { foreignKey: 'userId' });
    Endorse.belongsTo(User, { foreignKey: 'userId' });

    Contract.hasMany(User, { foreignKey: 'contractId' });
    User.belongsTo(Contract, { foreignKey: 'contractId' });

    Person.hasOne(User, { foreignKey: 'personId' });
    User.belongsTo(Person, { foreignKey: 'personId' });

    Company.hasOne(User, { foreignKey: 'companyId' });
    User.belongsTo(Company, { foreignKey: 'companyId' });

    Category.hasMany(Company, { foreignKey: 'categoryId' });
    Company.belongsTo(Category, { foreignKey: 'categoryId' });

    Category.hasMany(Endorse, { foreignKey: 'categoryId' });
    Endorse.belongsTo(Category, { foreignKey: 'categoryId' });

    Company.hasMany(Copyright, { foreignKey: 'companyId' });
    Copyright.belongsTo(Company, { foreignKey: 'companyId' });

    this.sequelize?.sync({ force: false }).then((value) => {
      //this.insertInitialValuesCategory();
      //this.insertInitialValuesCopyright();
    })
  }

  insertInitialValuesCategory() {
    Category.sync().then(() => {
      Category.create({
        name: 'Information Technology'
      });
      Category.create({
        name: 'Consulting'
      });
      Category.create({
        name: 'Marketing'
      });
      Category.create({
        name: 'Entertainment'
      });
    });
  }

  insertInitialValuesCopyright() {
    Copyright.sync().then(() => {
      Company.findAll().then(companies => {
        companies.forEach(c => {
          Copyright.create({
            name: 'Endorse an Idea Copyright 1',
            companyId: c.id,
            text: "",
          });

          Copyright.create({
            name: 'Endorse an Idea Copyright 2',
            companyId: c.id,
            text: "",
          });
        })
      });
    });
  }
}

export default Database;
