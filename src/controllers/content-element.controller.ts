import { Request, Response } from "express";
import ContentElement from "../models/content-element.model";
import contentElementRepository from "../repositories/content-element.repository";

export default class ContentElementController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const contentElement: ContentElement = req.body;
      
      const savedContentElement = await contentElementRepository.save(contentElement);

      res.status(201).send(savedContentElement);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await contentElementRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let contentElement: ContentElement = req.body;
    contentElement.id = parseInt(req.params.id);

    try {
      const num = await contentElementRepository.update(contentElement);

      if (num == 1) {
        res.send({
          message: "ContentElement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ContentElement with id=${contentElement.id}. Maybe ContentElement was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating ContentElement with id=${contentElement.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await contentElementRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "ContentElement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ContentElement with id=${id}. Maybe ContentElement was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete ContentElement with id==${id}.`
      });
    }
  }
}
