import { Request, Response } from "express";
import EndorseHistory from "../models/endorse-history.model";
import endorseHistoryRepository from "../repositories/endorse-history.repository";

export default class EndorseHistoryController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const endorseHistory: EndorseHistory = req.body;
      
      const savedEndorseHistory = await endorseHistoryRepository.save(endorseHistory);

      res.status(201).send(savedEndorseHistory);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await endorseHistoryRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let endorseHistory: EndorseHistory = req.body;
    endorseHistory.id = parseInt(req.params.id);

    try {
      const num = await endorseHistoryRepository.update(endorseHistory);

      if (num == 1) {
        res.send({
          message: "EndorseHistory was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update EndorseHistory with id=${endorseHistory.id}. Maybe EndorseHistory was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating EndorseHistory with id=${endorseHistory.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await endorseHistoryRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "EndorseHistory was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete EndorseHistory with id=${id}. Maybe EndorseHistory was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete EndorseHistory with id==${id}.`
      });
    }
  }

  async mountMyHistory(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const history = await endorseHistoryRepository.mountMyHistory(id);

      res.status(200).send(history);
    } catch (err) {
      res.status(500).send({
        message: `Could mount the history with id==${id}.`
      });
    }
  }
}
