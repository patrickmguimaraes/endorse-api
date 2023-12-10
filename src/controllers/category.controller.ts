import { Request, Response } from "express";
import Category from "../models/category.model";
import categoryRepository from "../repositories/category.repository";

export default class CategoryController {

  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const category: Category = req.body;
      
      const savedCategory = await categoryRepository.save(category);

      res.status(201).send(savedCategory);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving categories."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const categories = await categoryRepository.retrieveAll({ title });

      res.status(200).send(categories);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving categories."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const category = await categoryRepository.retrieveById(id);

      if (category) res.status(200).send(category);
      else
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Category with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let category: Category = req.body;
    category.id = parseInt(req.params.id);

    try {
      const num = await categoryRepository.update(category);

      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${category.id}. Maybe Category was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Category with id=${category.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await categoryRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Category with id==${id}.`
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const categories = await categoryRepository.retrieveAll({ published: true });

      res.status(200).send(categories);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving categories."
      });
    }
  }
}
