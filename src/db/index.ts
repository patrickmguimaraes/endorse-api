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
import EndorseAssignment from "../models/endorse-assignment.model";
import File from "../models/file.model";
import EndorseHistory from "../models/endorse-history.model";
import UserTermAndCondition from "../models/user-term-and-condition.model";
import TermAndCondition from "../models/term-and-condition.model";
import Token from "../models/token.model";
import { logger } from "../config/logger";
import Like from "../models/like.model";
import Comment from "../models/comment.model";
import Post from "../models/post.model";
import Endorsement from "../models/endorsement.model";
import Follower from "../models/follower.model";
import View from "../models/view.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase()
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      logging: false,
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
        Metric,
        EndorseAssignment,
        File,
        EndorseHistory,
        UserTermAndCondition,
        TermAndCondition,
        Token,
        Post,
        Like,
        Comment,
        Endorsement,
        Follower,
        View
      ]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        logger.info("Connection has been established successfully.");
        this.sync();
      })
      .catch((err) => {
        logger.error("Unable to connect to the Database:", err);
      });
  }

  public async sync() {
    User.hasMany(Endorse, { foreignKey: 'userId' });
    Endorse.belongsTo(User, { foreignKey: 'userId' });

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

    Endorse.hasMany(EndorseActivationDate, { foreignKey: 'endorseId' });
    EndorseActivationDate.belongsTo(Endorse, { foreignKey: 'endorseId' });

    Endorse.hasMany(EndorseComplianceMeasure, { foreignKey: 'endorseId' });
    EndorseComplianceMeasure.belongsTo(Endorse, { foreignKey: 'endorseId' });

    Endorse.hasMany(EndorseContentElement, { foreignKey: 'endorseId' });
    EndorseContentElement.belongsTo(Endorse, { foreignKey: 'endorseId' });

    Endorse.hasMany(EndorseGeograficScope, { foreignKey: 'endorseId' });
    EndorseGeograficScope.belongsTo(Endorse, { foreignKey: 'endorseId' });

    Endorse.hasMany(EndorseMediaChannel, { foreignKey: 'endorseId' });
    EndorseMediaChannel.belongsTo(Endorse, { foreignKey: 'endorseId' });

    Endorse.hasMany(EndorseMetric, { foreignKey: 'endorseId' });
    EndorseMetric.belongsTo(Endorse, { foreignKey: 'endorseId' });

    ActivationDate.hasMany(EndorseActivationDate, { foreignKey: 'activationDateId' });
    EndorseActivationDate.belongsTo(ActivationDate, { foreignKey: 'activationDateId' });

    ComplianceMeasure.hasMany(EndorseComplianceMeasure, { foreignKey: 'complianceMeasureId' });
    EndorseComplianceMeasure.belongsTo(ComplianceMeasure, { foreignKey: 'complianceMeasureId' });

    ContentElement.hasMany(EndorseContentElement, { foreignKey: 'contentElementId' });
    EndorseContentElement.belongsTo(ContentElement, { foreignKey: 'contentElementId' });

    GeograficScope.hasMany(EndorseGeograficScope, { foreignKey: 'geograficScopeId' });
    EndorseGeograficScope.belongsTo(GeograficScope, { foreignKey: 'geograficScopeId' });

    MediaChannel.hasMany(EndorseMediaChannel, { foreignKey: 'mediaChannelId' });
    EndorseMediaChannel.belongsTo(MediaChannel, { foreignKey: 'mediaChannelId' });

    Metric.hasMany(EndorseMetric, { foreignKey: 'metricId' });
    EndorseMetric.belongsTo(Metric, { foreignKey: 'metricId' });

    Endorse.hasMany(EndorseAssignment, { foreignKey: 'endorseId' });
    EndorseAssignment.belongsTo(Endorse, { foreignKey: 'endorseId' });

    Endorse.hasMany(File, { foreignKey: 'endorseId' });
    File.belongsTo(Endorse, { foreignKey: 'endorseId' });

    User.hasMany(File, { foreignKey: 'userId' });
    File.belongsTo(User, { foreignKey: 'userId' });

    Endorse.hasMany(EndorseHistory, { foreignKey: 'endorseId' });
    EndorseHistory.belongsTo(Endorse, { foreignKey: 'endorseId' });

    User.hasMany(EndorseHistory, { foreignKey: 'userId' });
    EndorseHistory.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Endorsement, { foreignKey: 'userId' });
    Endorsement.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Like, { foreignKey: 'userId' });
    Like.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });

    Endorsement.hasMany(Endorsement, { foreignKey: 'endorsementId' });
    Endorsement.belongsTo(Endorsement, { foreignKey: 'endorsementId' });

    Comment.hasMany(Comment, { foreignKey: 'commentId' });
    Comment.belongsTo(Comment, { foreignKey: 'commentId' });

    Post.hasMany(Endorsement, { foreignKey: 'postId' });
    Endorsement.belongsTo(Post, { foreignKey: 'postId' });

    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });

    Post.hasMany(Like, { foreignKey: 'postId' });
    Like.belongsTo(Post, { foreignKey: 'postId' });

    User.hasMany(Follower, { foreignKey: 'followerId' });
    Follower.belongsTo(User, { foreignKey: 'followerId' });

    User.hasMany(Follower, { foreignKey: 'followedId' });
    Follower.belongsTo(User, { foreignKey: 'followedId' });

    User.hasMany(View, { foreignKey: 'userId' });
    View.belongsTo(User, { foreignKey: 'userId' });

    Post.hasMany(View, { foreignKey: 'postId' });
    View.belongsTo(Post, { foreignKey: 'postId' });

    this.sequelize?.sync({ force: false, alter: true }).then((value) => {
      this.insertInitialTermsAndConditions();
      this.insertInitialValuesCategory();
      this.insertInitialValuesActivationDate()
      this.insertInitialValuesCompliance();
      this.insertInitialValuesContentElement();
      this.insertInitialValuesGeografic();
      this.insertInitialValuesMediaChannel();
      this.insertInitialValuesMetrics();
      this.insertInitialValuesUsers();
      //this.insertInitialValuesCopyright();
    })
  }

  insertInitialValuesCategory() {
    Category.sync().then(() => {
      Category.findAll().then(async value => {
        if (!value || value.length == 0) {
          await Category.create({
            name: 'Information Technology'
          });
          await Category.create({
            name: 'Consulting'
          });
          await Category.create({
            name: 'Marketing'
          });
          await Category.create({
            name: 'Entertainment'
          });
        }
      })

    });
  }

  insertInitialValuesActivationDate() {
    ActivationDate.findAll().then(value => {
      if (!value || value.length == 0) {
        ActivationDate.sync().then(() => {
          ActivationDate.create({
            name: 'Event'
          });
          ActivationDate.create({
            name: 'Webnar'
          });
          ActivationDate.create({
            name: 'Product Lunch'
          });
        });
      }
    })
  }

  insertInitialValuesCompliance() {
    ComplianceMeasure.findAll().then(value => {
      if (!value || value.length == 0) {
        ComplianceMeasure.sync().then(() => {
          ComplianceMeasure.create({
            name: 'Regular Audits'
          });
          ComplianceMeasure.create({
            name: 'Reporting'
          });
        });
      }
    })
  }

  insertInitialValuesContentElement() {
    ContentElement.findAll().then(value => {
      if (!value || value.length == 0) {
        ContentElement.sync().then(() => {
          ContentElement.create({
            name: 'Digital Graphics'
          });
          ContentElement.create({
            name: 'Print Materials'
          });
          ContentElement.create({
            name: 'Video Content'
          });
        });
      }
    })
  }

  insertInitialValuesMediaChannel() {
    MediaChannel.findAll().then(value => {
      if (!value || value.length == 0) {
        MediaChannel.sync().then(() => {
          MediaChannel.create({
            name: 'Digital Platforms'
          });
          MediaChannel.create({
            name: 'Print materials'
          });
        });
      }
    })
  }

  insertInitialValuesGeografic() {
    GeograficScope.findAll().then(value => {
      if (!value || value.length == 0) {
        GeograficScope.sync().then(() => {
          GeograficScope.create({
            name: 'North America'
          });
          GeograficScope.create({
            name: 'Europe'
          });
          GeograficScope.create({
            name: 'Asia'
          });
          GeograficScope.create({
            name: 'South America'
          });
          GeograficScope.create({
            name: 'Central America'
          });
          GeograficScope.create({
            name: 'Africa'
          });
          GeograficScope.create({
            name: 'Oceania'
          });
        });
      }
    })
  }

  insertInitialValuesMetrics() {
    Metric.findAll().then(value => {
      if (!value || value.length == 0) {
        Metric.sync().then(() => {
          Metric.create({
            name: 'Engagement rates'
          });
          Metric.create({
            name: 'Website traffic'
          });
          Metric.create({
            name: 'Social media impressions'
          });
        });
      }
    })
  }

  insertInitialValuesCopyright() {
    Copyright.sync().then(() => {
      Company.findAll().then(companies => {
        companies.forEach(c => {
          Copyright.create({
            name: 'Use of Snow White character',
            companyId: c.id,
            text: "",
          });

          Copyright.create({
            name: 'Use of Cinderella character',
            companyId: c.id,
            text: "",
          });
        })
      });
    });
  }

  insertInitialTermsAndConditions() {
    TermAndCondition.sync().then(() => {
      TermAndCondition.findAll().then(value => {
        if (!value || value.length == 0) {
          TermAndCondition.create({
            name: 'Terms and Conditions - 14/12/2023',
            text: 'Terms',
            date: new Date()
          });
        }
      })

    });
  }

  insertInitialValuesUsers() {
    User.sync().then(() => {
      User.findAll().then(async value => {
        if (!value || value.length == 0) {
          var p = await Person.create({
            name: 'João',
            surname: 'Dias Guimarães',
            birth: new Date().toISOString().substring(0, 10),
            gender: 'Male',
            profession: 'Farmer',
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user1@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            personId: p.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var p = await Person.create({
            name: 'Leonidia',
            surname: 'Mendes Guimarães',
            birth: new Date().toISOString().substring(0, 10),
            gender: 'Female',
            profession: 'Farmer',
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user2@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            personId: p.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var p = await Person.create({
            name: 'Maria',
            surname: 'Mendes Trindade',
            birth: new Date().toISOString().substring(0, 10),
            gender: 'Female',
            profession: 'Farmer',
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user3@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            personId: p.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var p = await Person.create({
            name: 'Paloma',
            surname: 'Mendes Guimarães',
            birth: new Date().toISOString().substring(0, 10),
            gender: 'Female',
            profession: 'Social Service',
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user4@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            personId: p.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var p = await Person.create({
            name: 'Willian',
            surname: 'Moraes',
            birth: new Date().toISOString().substring(0, 10),
            gender: 'Male',
            profession: 'Investor',
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user5@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            personId: p.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var p = await Person.create({
            name: 'José',
            surname: 'Trindade',
            birth: new Date().toISOString().substring(0, 10),
            gender: 'Male',
            profession: 'Farmer',
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user6@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            personId: p.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var c = await Company.create({
            name: 'Disney',
            businessLocation: 'Miami, Florida',
            businessWebsite: "www.disney.com",
            businessSize: 'Large',
            categoryId: 4,
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user7@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            companyId: c.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var c = await Company.create({
            name: 'PMG Systems',
            businessLocation: 'Pindaí, Bahia',
            businessWebsite: "www.pmgsystems.com.br",
            businessSize: 'Small',
            categoryId: 1,
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user8@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            companyId: c.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var c = await Company.create({
            name: 'DC Pictures',
            businessLocation: 'Hollywood, California',
            businessWebsite: "www.dcpictures.com",
            businessSize: 'Large',
            categoryId: 4,
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user9@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            companyId: c.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });

          var c = await Company.create({
            name: 'Capigemini',
            businessLocation: 'Salvador, Bahia',
            businessWebsite: "www.capgemini.com",
            businessSize: 'Large',
            categoryId: 2,
          });

          await User.create({
            role: 'user',
            username: new Date().valueOf().toString(36),
            email: "user10@outlook.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Person",
            phone: "+55 (77) 9 8135-0987",
            streetLine1: "Rua Ayrton Senna, 18",
            streetLine2: "Casa",
            country: "Brazil",
            state: "Bahia",
            city: "Pindaí",
            postalCode: "46360-000",
            contractId: 1,
            companyId: c.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active'
          });
        }
      })

    });
  }
}

export default Database;
