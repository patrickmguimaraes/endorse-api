import { Op, Sequelize } from "sequelize";
import User from "../models/user.model";
import Person from "../models/person.model";
import Company from "../models/company.model";
import Category from "../models/category.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import Follower from "../models/follower.model";
import Industry from "../models/industry.model";

interface SearchCondition {
  [key: string]: any;
}

class UserRepository {
  async login(searchParams: {authId?: string}): Promise<User | null> {
    try {
      let condition: SearchCondition = {};
      condition.authId = { [Op.like]: `${searchParams.authId}` };

      return await User.findOne({ where: { authId: searchParams.authId }, include: [{ model: Person, as: 'person' }, { model: Company, as: 'company', include: [{ model: Industry }] }] });
    } catch (error) {
      throw new Error("Failed to login!");
    }
  }

  async existsEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email: email }, include: [{ model: Person, as: 'person' }, { model: Company, as: 'company'}] });
      
      return user;
    } catch (error) {
      throw new Error("Failed to looking for the email!");
    }
  }

  async save(user: User): Promise<User> {
    try {
      var check: User | null = new User();
      var username: string = (user.type=="Person" ? user.person?.name + "-" + user.person?.surname : user.company?.name) as string;
      
      username = username.toLowerCase();
      username = username.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

      while(username.includes(".")) {
        username = username.replace(".", "-");
      }

      while(username.includes(" ")) {
        username = username.replace(" ", "-");
      }

      while(check!=null) {
        check = await User.findOne({where: { username: username }});

        if(check) {
          username = username + Math.floor(Math.random() * 6) + 1;
        }
      }

      user.followeds = [];
      user.followers = [];
      user.posts = [];
      user.views = [];
      user.username = username;
      return await User.create({...user}, {include:[{ all: true }]});
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<User[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.published) condition.published = true;

      if (searchParams?.title)
        condition.title = { [Op.like]: `%${searchParams.title}%` };

      return await User.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Users!");
    }
  }

  async retrieveById(userId: number, includeAll: boolean = false): Promise<User | null> {
    try {
      var include: any = [{ model: Person, as: 'person' }, { model: Company, as: 'company', include: [{ model: Industry }] }]
      
      if(includeAll) { 
        include = [
          { model: Person, as: 'person' }, 
          { model: Company, as: 'company', include: [{ model: Industry }] },
          { model: Follower, as: 'followers', limit: 5 },
          { model: Follower, as: 'followeds', limite: 5 }
        ]
      }
     
      var user = await User.findByPk(userId, { include: include });

      return user;
    } catch (error: any) {
      console.log(error.message)
      throw new Error("Failed to retrieve Users!");
    }
  }

  async update(user: User): Promise<number> {
    try {
      const affectedRows = await User.update(
        { ...user },
        { where: { id: user.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update User!");
    }
  }

  async delete(userId: number): Promise<number> {
    try {
      const affectedRows = await User.destroy({ where: { id: userId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete User!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return User.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Users!");
    }
  }

  async search(searchText: string): Promise<User[] | null> {
    try {
      const companies = await Company.findAll({
        where: { name: {[Op.like]: "%"+searchText+"%" }},
        attributes: ['id'],
      });
  
      const companiesId = companies.map((company) => company.id);

      const people = await Person.findAll({
        where: { 
          [Op.or]: { 
            name: {[Op.like]: "%"+searchText+"%" },
            surname: {[Op.like]: "%"+searchText+"%" }},
        },
        attributes: ['id'],
      });
  
      const peopleId = people.map((person) => person.id);

      const users = await User.findAll({
        where: {
          personId: {
            [Op.or]: [...peopleId],
          },
          companyId: {
            [Op.or]: [...companiesId],
          },
          status: 'Active',
        },
        include: [
          { model: Person, as: 'person' }, 
          { model: Company, as: 'company'}
        ],
        order: [['date', 'DESC']],
        limit: 10
      });
  
      return users;
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'A problem happened when searching... Try later.');
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      return User.findOne({ where: {username: username}, include: [{ model: Person, as: 'person' }, { model: Company, as: 'company', include: [{ model: Industry }] }] });
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'A problem happened when getting the user... Try later.');
    }
  }

  async retriveAllEmployees(companiesId: Array<number>): Promise<User[]> {
    try {
      return User.findAll({ where: {type: 'Person', companyId: { [Op.in]: companiesId }}, include: [{ model: Person, as: 'person' }, { model: Company, as: 'company', include: [{ model: Industry }] }] });
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'A problem happened when getting the user... Try later.');
    }
  }
}

export default new UserRepository();
