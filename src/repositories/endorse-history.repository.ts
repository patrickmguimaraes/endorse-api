import Company from "../models/company.model";
import EndorseHistory from "../models/endorse-history.model";
import Endorse from "../models/endorse.model";
import Person from "../models/person.model";
import User from "../models/user.model";

interface IEndorseHistoryRepository {
  save(endorse: EndorseHistory): Promise<EndorseHistory>;
  update(endorse: EndorseHistory): Promise<number>;
  delete(endorseId: number): Promise<number>;
  getAll(): Promise<EndorseHistory[]>;
}

class EndorseHistoryRepository implements IEndorseHistoryRepository {
  async save(endorse: EndorseHistory): Promise<EndorseHistory> {
    try {
      return await EndorseHistory.create({...endorse});
    } catch (err) {
      throw err;
    }
  }

  async update(endorse: EndorseHistory): Promise<number> {
    try {
      const affectedRows = await EndorseHistory.update(
        { ...endorse },
        { where: { id: endorse.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Endorse!");
    }
  }

  async delete(endorseId: number): Promise<number> {
    try {
      const affectedRows = await EndorseHistory.destroy({ where: { id: endorseId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Endorse!");
    }
  }

  async getAll(): Promise<EndorseHistory[]> {
    try {
      const rows = await EndorseHistory.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }

  async mountMyHistory(userId: number): Promise<EndorseHistory[]> {
    try {
      const rows = await EndorseHistory.findAll({ where: { userId: userId } , include: [{ model: Endorse, as: 'endorse', include: [{ model: User, as: 'user', include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }] }] }, { model: User, as: 'user', include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }] }] });

      return rows;
    } catch (error) {
      throw new Error("Failed to delete Endorse!");
    }
  }
}

export default new EndorseHistoryRepository();
