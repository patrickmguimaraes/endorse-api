import Endorse from "../models/endorse.model";

interface IEndorseRepository {
  save(endorse: Endorse): Promise<Endorse>;
  update(endorse: Endorse): Promise<number>;
  delete(endorseId: number): Promise<number>;
  getAll(): Promise<Endorse[]>;
}

class EndorseRepository implements IEndorseRepository {
  async save(endorse: Endorse): Promise<Endorse> {
    try {
      return await Endorse.create({...endorse});
    } catch (err) {
      throw err;
    }
  }

  async update(endorse: Endorse): Promise<number> {
    try {
      const affectedRows = await Endorse.update(
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
      const affectedRows = await Endorse.destroy({ where: { id: endorseId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Endorse!");
    }
  }

  async getAll(): Promise<Endorse[]> {
    try {
      const rows = await Endorse.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new EndorseRepository();
