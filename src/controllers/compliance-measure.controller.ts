import { Request, Response } from "express";
import ComplianceMeasure from "../models/compliance-measure.model";
import complianceMeasureRepository from "../repositories/compliance-measure.repository";

export default class ComplianceMeasureController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const complianceMeasure: ComplianceMeasure = req.body;
      
      const savedComplianceMeasure = await complianceMeasureRepository.save(complianceMeasure);

      res.status(201).send(savedComplianceMeasure);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await complianceMeasureRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let complianceMeasure: ComplianceMeasure = req.body;
    complianceMeasure.id = parseInt(req.params.id);

    try {
      const num = await complianceMeasureRepository.update(complianceMeasure);

      if (num == 1) {
        res.send({
          message: "ComplianceMeasure was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ComplianceMeasure with id=${complianceMeasure.id}. Maybe ComplianceMeasure was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating ComplianceMeasure with id=${complianceMeasure.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await complianceMeasureRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "ComplianceMeasure was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ComplianceMeasure with id=${id}. Maybe ComplianceMeasure was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete ComplianceMeasure with id==${id}.`
      });
    }
  }
}
