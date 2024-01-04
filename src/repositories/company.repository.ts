import { Op, Sequelize } from "sequelize";
import Company from "../models/company.model";
import Copyright from "../models/copyright.model";
import User from "../models/user.model";
import Industry from "../models/industry.model";
import { config } from "../config/db.config";
import httpStatus from "http-status";
import City from "../models/city.model";
import State from "../models/state.model";
import Country from "../models/country.model";

const sdk = require('api')('@peopledatalabs/v5.0#1g9k9252lmbejh2q');

sdk.auth(config.PEOPLE_DATA_LABS);

interface ICompanyRepository {
  save(company: Company): Promise<Company>;
  retrieveAll(searchParams: { title: string, published: boolean }): Promise<Company[]>;
  retrieveById(companyId: number): Promise<Company | null>;
  update(company: Company): Promise<number>;
  delete(companyId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class CompanyRepository implements ICompanyRepository {
  async save(company: Company): Promise<Company> {
    try {
      return await Company.create({ ...company });
    } catch (err) {
      throw new Error("Failed to create Company!");
    }
  }

  async retrieveAll(searchParams: { title?: string, published?: boolean }): Promise<Company[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.published) condition.published = true;

      if (searchParams?.title)
        condition.title = { [Op.like]: `%${searchParams.title}%` };

      return await Company.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Companys!");
    }
  }

  async retrieveById(companyId: number): Promise<Company | null> {
    try {
      return await Company.findByPk(companyId);
    } catch (error) {
      throw new Error("Failed to retrieve Companys!");
    }
  }

  async update(company: Company): Promise<number> {
    try {
      const affectedRows = await Company.update(
        { ...company },
        { where: { id: company.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Company!");
    }
  }

  async delete(companyId: number): Promise<number> {
    try {
      const affectedRows = await Company.destroy({ where: { id: companyId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Company!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Company.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Companys!");
    }
  }

  async findByIndustry(searchParams: { industryId?: string }): Promise<Company[] | null> {
    try {
      let condition: SearchCondition = {};
      condition.industryId = { [Op.like]: `${searchParams.industryId}` };

      return await Company.findAll({ where: condition, include: [{ model: Copyright, as: 'copyrights' }, { model: User, as: 'user' }] });
    } catch (error) {
      throw new Error("Failed to findByIndustry!");
    }
  }

  async getAllIndustries(): Promise<Industry[]> {
    try {
      return await Industry.findAll({ order: [["name", "ASC"]] });
    } catch (error) {
      throw new Error("Failed to getAllIndustries!");
    }
  }

  async getCompanies(name: string): Promise<Company[]> {
    try {

      const companies = await Company.findAll({ where: { name: { [Op.iLike]: '%' + name + '%' } } , include: [{ model: Industry }, { model: Copyright }, { model: City, include: [{ model: State, include: [{ model: Country }] }] }] });
      if(companies.length> 0) { return companies; }

      const search = await sdk.getV5CompanyEnrich({ name: name, pretty: 'false' });

      if (search.status == httpStatus.OK) {
        var data = search.data;

        var com = await Company.findOne({ where: { handle: data.id }, include: [{ model: Industry }, { model: Copyright }, { model: City, include: [{ model: State, include: [{ model: Country }] }] }] });

        if (com) {
          return [com];
        }
        else {
          var c: any = {};
          c.handle = data.id;
          c.name = data.display_name;
          c.size = data.size;
          c.founded = data.founded;
          c.website = data.website;
          c.linkedin = data.linkedin_url;
          c.facebook = data.facebook_url;
          c.twitter = data.twitter_url;
          c.summary = data.summary;

          const industry = await Industry.findOne({ where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), data.industry) });
          c.industryId = industry?.id!;

          const country = data.location.country ? await Country.findOne({ where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), data.location.country) }) : undefined;
          const state = data.location.region && country ? await State.findOne({ where: { name: { [Op.iLike]: data.location.region }, countryId: country?.id } }) : undefined;
          const city = data.location.locality && state ? await City.findOne({ where: { name: { [Op.iLike]: data.location.locality }, stateId: state?.id } }) : undefined;
          c.cityId = city ? city.id : undefined;

          await Company.create({ ...c });
          var company = await Company.findOne({ where: { handle: data.id }, include: [{ model: Industry }, { model: Copyright }, { model: City, include: [{ model: State, include: [{ model: Country }] }] }] });
          return [company!];
        }
      }
      else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message)
      throw new Error("Failed to getCompanies!");
    }
  }
}

export default new CompanyRepository();
