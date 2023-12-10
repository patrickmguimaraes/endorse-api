import { Request, Response } from "express";
import GeograficScope from "../models/geografic-scope.model";
import geograficScopeRepository from "../repositories/geografic-scope.repository";

export default class GeograficScopeController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const geograficScope: GeograficScope = req.body;
      
      const savedGeograficScope = await geograficScopeRepository.save(geograficScope);

      res.status(201).send(savedGeograficScope);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await geograficScopeRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let geograficScope: GeograficScope = req.body;
    geograficScope.id = parseInt(req.params.id);

    try {
      const num = await geograficScopeRepository.update(geograficScope);

      if (num == 1) {
        res.send({
          message: "GeograficScope was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update GeograficScope with id=${geograficScope.id}. Maybe GeograficScope was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating GeograficScope with id=${geograficScope.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await geograficScopeRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "GeograficScope was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete GeograficScope with id=${id}. Maybe GeograficScope was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete GeograficScope with id==${id}.`
      });
    }
  }
}
