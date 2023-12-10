import Metric from "../models/metric.model";

interface IMetricRepository {
  save(metric: Metric): Promise<Metric>;
  update(metric: Metric): Promise<number>;
  delete(metricId: number): Promise<number>;
  getAll(): Promise<Metric[]>;
}

class MetricRepository implements IMetricRepository {
  async save(metric: Metric): Promise<Metric> {
    try {
      return await Metric.create({...metric});
    } catch (err) {
      throw new Error("Failed to create Metric!");
    }
  }

  async update(metric: Metric): Promise<number> {
    try {
      const affectedRows = await Metric.update(
        { ...metric },
        { where: { id: metric.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Metric!");
    }
  }

  async delete(metricId: number): Promise<number> {
    try {
      const affectedRows = await Metric.destroy({ where: { id: metricId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Metric!");
    }
  }

  async getAll(): Promise<Metric[]> {
    try {
      const rows = await Metric.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new MetricRepository();
