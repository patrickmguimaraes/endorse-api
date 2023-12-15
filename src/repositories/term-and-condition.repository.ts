import TermAndCondition from '../models/term-and-condition.model';

class TermAndConditionRepository {
  async save(termAndCondition: TermAndCondition): Promise<TermAndCondition> {
    try {
      return await TermAndCondition.create({...termAndCondition}, {include:[{ all: true }]});
    } catch (err) {
      throw err;
    }
  }

  async update(termAndCondition: TermAndCondition): Promise<number> {
    try {
      const affectedRows = await TermAndCondition.update(
        { ...termAndCondition },
        { where: { id: termAndCondition.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update TermAndCondition!");
    }
  }

  async delete(termAndConditionId: number): Promise<number> {
    try {
      const affectedRows = await TermAndCondition.destroy({ where: { id: termAndConditionId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete TermAndCondition!");
    }
  }

  async getAll(): Promise<TermAndCondition[]> {
    try {
      const rows = await TermAndCondition.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }

  async getLast(): Promise<TermAndCondition> {
    try {
      const rows = await TermAndCondition.findAll({order: [['id', 'DESC']], limit: 1});

      return rows[0];
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new TermAndConditionRepository();