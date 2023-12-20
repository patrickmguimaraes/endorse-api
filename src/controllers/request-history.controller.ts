import { Response } from "express";
import RequestHistory from "../models/request-history.model";
import requestHistoryRepository from "../repositories/request-history.repository";

export default class RequestHistoryController {
  async create(req: any, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const requestHistory: RequestHistory = req.body;
      
      const savedRequestHistory = await requestHistoryRepository.save(requestHistory);

      res.status(201).send(savedRequestHistory);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: any, res: Response) {
    try {
      const people = await requestHistoryRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: any, res: Response) {
    let requestHistory: RequestHistory = req.body;
    requestHistory.id = parseInt(req.params.id);

    try {
      const num = await requestHistoryRepository.update(requestHistory);

      if (num == 1) {
        res.send({
          message: "RequestHistory was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update RequestHistory with id=${requestHistory.id}. Maybe RequestHistory was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating RequestHistory with id=${requestHistory.id}.`
      });
    }
  }

  async delete(req: any, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await requestHistoryRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "RequestHistory was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete RequestHistory with id=${id}. Maybe RequestHistory was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete RequestHistory with id==${id}.`
      });
    }
  }

  async mountMyHistory(req: any, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const history = await requestHistoryRepository.mountMyHistory(id);

      res.status(200).send(history);
    } catch (err) {
      res.status(500).send({
        message: `Could mount the history with id==${id}.`
      });
    }
  }
}
