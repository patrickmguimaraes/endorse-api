import { Op } from "sequelize";
import User from "../models/user.model";
import Person from "../models/person.model";
import Company from "../models/company.model";
import Category from "../models/category.model";

interface IUserRepository {
  login(searchParams: {authId: string}): Promise<User | null>;
  existsEmail(searchParams: {email: string}): Promise<User | null>;
  save(user: User): Promise<User>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<User[]>;
  retrieveById(userId: number): Promise<User | null>;
  update(user: User): Promise<number>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class UserRepository implements IUserRepository {
  async login(searchParams: {authId?: string}): Promise<User | null> {
    try {
      let condition: SearchCondition = {};
      condition.authId = { [Op.like]: `${searchParams.authId}` };

      return await User.findOne({ where: condition, include: [{ model: Person, as: 'person' }, { model: Company, as: 'company', include: [{ model: Category, as: 'category' }] }] });
    } catch (error) {
      throw new Error("Failed to login!");
    }
  }

  async existsEmail(searchParams: {email?: string}): Promise<User | null> {
    try {
      let condition: SearchCondition = {};
      condition.email = { [Op.like]: `${searchParams.email}` };

      return await User.findOne({ where: condition, include: [{ model: Person, as: 'person' }, { model: Company, as: 'company', include: [{ model: Category, as: 'category' }] }] });
    } catch (error) {
      throw new Error("Failed to existsEmail!");
    }
  }

  async save(user: User): Promise<User> {
    try {
      return await User.create({...user}, {include:[{ all: true }]});
    } catch (err) {
      throw new Error("Failed to create User!");
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

  async retrieveById(userId: number): Promise<User | null> {
    try {
      return await User.findByPk(userId, { include: [{ model: Person, as: 'person' }, { model: Company, as: 'company', include: [{ model: Category, as: 'category' }] }] });
    } catch (error) {
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
}

export default new UserRepository();
