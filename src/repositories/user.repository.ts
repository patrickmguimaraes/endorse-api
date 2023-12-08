import { Op } from "sequelize";
import User from "../models/user.model";

interface IUserRepository {
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
  async save(user: User): Promise<User> {
    try {
      return await User.create({
        email: user.email,
        password: user.password,
        company: user.company,
        name: user.name, 
        surname: user.surname, 
        date: user.date, 
        removed: user.removed

      });
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
      return await User.findByPk(userId);
    } catch (error) {
      throw new Error("Failed to retrieve Users!");
    }
  }

  async update(user: User): Promise<number> {
    const { id, email, password, company, name, surname, date, removed } = user;

    try {
      const affectedRows = await User.update(
        { email, password, company, name, surname, date, removed },
        { where: { id: id } }
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
