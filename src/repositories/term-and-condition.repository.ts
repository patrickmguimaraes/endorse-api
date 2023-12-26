import Agreement from '../models/agreement.model';

class AgreementRepository {
  async save(termAndCondition: Agreement): Promise<Agreement> {
    try {
      return await Agreement.create({...termAndCondition}, {include:[{ all: true }]});
    } catch (err) {
      throw err;
    }
  }

  async update(termAndCondition: Agreement): Promise<number> {
    try {
      const affectedRows = await Agreement.update(
        { ...termAndCondition },
        { where: { id: termAndCondition.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Agreement!");
    }
  }

  async delete(termAndConditionId: number): Promise<number> {
    try {
      const affectedRows = await Agreement.destroy({ where: { id: termAndConditionId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Agreement!");
    }
  }

  async getAll(): Promise<Agreement[]> {
    try {
      const rows = await Agreement.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }

  async getLast(): Promise<Agreement> {
    try {
      const rows = await Agreement.findAll({order: [['id', 'DESC']], limit: 1});

      return rows[0];
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new AgreementRepository();