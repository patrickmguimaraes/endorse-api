import Company from "../models/company.model";
import RequestHistory from "../models/request-history.model";
import Request from "../models/request.model";
import Person from "../models/person.model";
import User from "../models/user.model";

interface IRequestHistoryRepository {
  save(request: RequestHistory): Promise<RequestHistory>;
  update(request: RequestHistory): Promise<number>;
  delete(requestId: number): Promise<number>;
  getAll(): Promise<RequestHistory[]>;
}

class RequestHistoryRepository implements IRequestHistoryRepository {
  async save(request: RequestHistory): Promise<RequestHistory> {
    try {
      return await RequestHistory.create({...request});
    } catch (err) {
      throw err;
    }
  }

  async update(request: RequestHistory): Promise<number> {
    try {
      const affectedRows = await RequestHistory.update(
        { ...request },
        { where: { id: request.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Request!");
    }
  }

  async delete(requestId: number): Promise<number> {
    try {
      const affectedRows = await RequestHistory.destroy({ where: { id: requestId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Request!");
    }
  }

  async getAll(): Promise<RequestHistory[]> {
    try {
      const rows = await RequestHistory.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }

  async mountMyHistory(userId: number): Promise<RequestHistory[]> {
    try {
      const rows = await RequestHistory.findAll({ where: { userId: userId } , include: [{ model: Request, as: 'request', include: [{ model: User, as: 'user', include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }] }] }, { model: User, as: 'user', include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }] }] });

      return rows;
    } catch (error) {
      throw new Error("Failed to delete Request!");
    }
  }
}

export default new RequestHistoryRepository();
