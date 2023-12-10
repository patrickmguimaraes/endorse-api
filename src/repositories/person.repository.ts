import { Op } from "sequelize";
import Person from "../models/person.model";

interface IPersonRepository {
  save(person: Person): Promise<Person>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Person[]>;
  retrieveById(personId: number): Promise<Person | null>;
  update(person: Person): Promise<number>;
  delete(personId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class PersonRepository implements IPersonRepository {
  async login(searchParams: {authId?: string}): Promise<Person | null> {
    try {
      let condition: SearchCondition = {};
      condition.authId = { [Op.like]: `${searchParams.authId}` };

      return await Person.findOne({ where: condition });
    } catch (error) {
      throw new Error("Failed to login!");
    }
  }

  async save(person: Person): Promise<Person> {
    try {
      return await Person.create({...person});
    } catch (err) {
      throw new Error("Failed to create Person!");
    }
  }

  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Person[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.published) condition.published = true;

      if (searchParams?.title)
        condition.title = { [Op.like]: `%${searchParams.title}%` };

      return await Person.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Persons!");
    }
  }

  async retrieveById(personId: number): Promise<Person | null> {
    try {
      return await Person.findByPk(personId);
    } catch (error) {
      throw new Error("Failed to retrieve Persons!");
    }
  }

  async update(person: Person): Promise<number> {
    try {
      const affectedRows = await Person.update(
        { ...person },
        { where: { id: person.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Person!");
    }
  }

  async delete(personId: number): Promise<number> {
    try {
      const affectedRows = await Person.destroy({ where: { id: personId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Person!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Person.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Persons!");
    }
  }
}

export default new PersonRepository();
