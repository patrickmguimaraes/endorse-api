import ComplianceMeasure from "../models/compliance-measure.model";

interface IComplianceMeasureRepository {
  save(complianceMeasure: ComplianceMeasure): Promise<ComplianceMeasure>;
  update(complianceMeasure: ComplianceMeasure): Promise<number>;
  delete(complianceMeasureId: number): Promise<number>;
  getAll(): Promise<ComplianceMeasure[]>;
}

class ComplianceMeasureRepository implements IComplianceMeasureRepository {
  async save(complianceMeasure: ComplianceMeasure): Promise<ComplianceMeasure> {
    try {
      return await ComplianceMeasure.create({...complianceMeasure});
    } catch (err) {
      throw new Error("Failed to create ComplianceMeasure!");
    }
  }

  async update(complianceMeasure: ComplianceMeasure): Promise<number> {
    try {
      const affectedRows = await ComplianceMeasure.update(
        { ...complianceMeasure },
        { where: { id: complianceMeasure.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update ComplianceMeasure!");
    }
  }

  async delete(complianceMeasureId: number): Promise<number> {
    try {
      const affectedRows = await ComplianceMeasure.destroy({ where: { id: complianceMeasureId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete ComplianceMeasure!");
    }
  }

  async getAll(): Promise<ComplianceMeasure[]> {
    try {
      const rows = await ComplianceMeasure.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new ComplianceMeasureRepository();
