import Request from "../models/request-copyright.model";

interface IRequestRepository {
  save(request: Request): Promise<Request>;
  update(request: Request): Promise<number>;
  delete(requestId: number): Promise<number>;
  getAll(): Promise<Request[]>;
}

class RequestRepository implements IRequestRepository {
  async save(request: Request): Promise<Request> {
    try {
      return await Request.create({...request}, {include:[{ all: true }]});
    } catch (err) {
      throw err;
    }
  }

  async update(request: Request): Promise<number> {
    try {
      const affectedRows = await Request.update(
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
      const affectedRows = await Request.destroy({ where: { id: requestId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Request!");
    }
  }

  async getAll(): Promise<Request[]> {
    try {
      const rows = await Request.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new RequestRepository();
