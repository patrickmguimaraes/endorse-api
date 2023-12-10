import GeograficScope from "../models/geografic-scope.model";

interface IGeograficScopeRepository {
  save(geograficScope: GeograficScope): Promise<GeograficScope>;
  update(geograficScope: GeograficScope): Promise<number>;
  delete(geograficScopeId: number): Promise<number>;
  getAll(): Promise<GeograficScope[]>;
}

class GeograficScopeRepository implements IGeograficScopeRepository {
  async save(geograficScope: GeograficScope): Promise<GeograficScope> {
    try {
      return await GeograficScope.create({...geograficScope});
    } catch (err) {
      throw new Error("Failed to create GeograficScope!");
    }
  }

  async update(geograficScope: GeograficScope): Promise<number> {
    try {
      const affectedRows = await GeograficScope.update(
        { ...geograficScope },
        { where: { id: geograficScope.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update GeograficScope!");
    }
  }

  async delete(geograficScopeId: number): Promise<number> {
    try {
      const affectedRows = await GeograficScope.destroy({ where: { id: geograficScopeId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete GeograficScope!");
    }
  }

  async getAll(): Promise<GeograficScope[]> {
    try {
      const rows = await GeograficScope.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new GeograficScopeRepository();
