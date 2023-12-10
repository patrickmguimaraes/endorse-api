import { Request, Response } from "express";
import ActivationDate from "../models/activation-date.model";
import activationdateRepository from "../repositories/activation-date.repository";

export default class ActivationDateController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const activationdate: ActivationDate = req.body;
      
      const savedActivationDate = await activationdateRepository.save(activationdate);

      res.status(201).send(savedActivationDate);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await activationdateRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let activationdate: ActivationDate = req.body;
    activationdate.id = parseInt(req.params.id);

    try {
      const num = await activationdateRepository.update(activationdate);

      if (num == 1) {
        res.send({
          message: "ActivationDate was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ActivationDate with id=${activationdate.id}. Maybe ActivationDate was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating ActivationDate with id=${activationdate.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await activationdateRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "ActivationDate was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ActivationDate with id=${id}. Maybe ActivationDate was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete ActivationDate with id==${id}.`
      });
    }
  }
}
