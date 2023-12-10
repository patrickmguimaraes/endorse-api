import ActivationDate from "../models/activation-date.model";

interface IActivationDateRepository {
  save(activationDate: ActivationDate): Promise<ActivationDate>;
  update(activationDate: ActivationDate): Promise<number>;
  delete(activationDateId: number): Promise<number>;
  getAll(): Promise<ActivationDate[]>;
}

class ActivationDateRepository implements IActivationDateRepository {
  async save(activationDate: ActivationDate): Promise<ActivationDate> {
    try {
      return await ActivationDate.create({...activationDate});
    } catch (err) {
      throw new Error("Failed to create ActivationDate!");
    }
  }

  async update(activationDate: ActivationDate): Promise<number> {
    try {
      const affectedRows = await ActivationDate.update(
        { ...activationDate },
        { where: { id: activationDate.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update ActivationDate!");
    }
  }

  async delete(activationDateId: number): Promise<number> {
    try {
      const affectedRows = await ActivationDate.destroy({ where: { id: activationDateId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete ActivationDate!");
    }
  }

  async getAll(): Promise<ActivationDate[]> {
    try {
      const rows = await ActivationDate.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new ActivationDateRepository();
