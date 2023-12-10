import { Op } from "sequelize";
import Company from "../models/company.model";

interface ICompanyRepository {
  save(company: Company): Promise<Company>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Company[]>;
  retrieveById(companyId: number): Promise<Company | null>;
  update(company: Company): Promise<number>;
  delete(companyId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class CompanyRepository implements ICompanyRepository {
  async login(searchParams: {authId?: string}): Promise<Company | null> {
    try {
      let condition: SearchCondition = {};
      condition.authId = { [Op.like]: `${searchParams.authId}` };

      return await Company.findOne({ where: condition });
    } catch (error) {
      throw new Error("Failed to login!");
    }
  }

  async save(company: Company): Promise<Company> {
    try {
      return await Company.create({...company});
    } catch (err) {
      throw new Error("Failed to create Company!");
    }
  }

  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Company[]> {
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
}

export default new CompanyRepository();
