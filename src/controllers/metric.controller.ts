import { Request, Response } from "express";
import Metric from "../models/metric.model";
import metricRepository from "../repositories/metric.repository";

export default class MetricController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const metric: Metric = req.body;
      
      const savedMetric = await metricRepository.save(metric);

      res.status(201).send(savedMetric);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await metricRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let metric: Metric = req.body;
    metric.id = parseInt(req.params.id);

    try {
      const num = await metricRepository.update(metric);

      if (num == 1) {
        res.send({
          message: "Metric was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Metric with id=${metric.id}. Maybe Metric was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Metric with id=${metric.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await metricRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Metric was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Metric with id=${id}. Maybe Metric was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Metric with id==${id}.`
      });
    }
  }
}
