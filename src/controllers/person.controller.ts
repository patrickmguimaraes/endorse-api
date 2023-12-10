import { Request, Response } from "express";
import Person from "../models/person.model";
import personRepository from "../repositories/person.repository";

export default class PersonController {
  async login(req: Request, res: Response) {
    try {
      const person = await personRepository.login({ authId: req.params.id});

      res.status(200).send(person);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const person: Person = req.body;
      
      const savedPerson = await personRepository.save(person);

      res.status(201).send(savedPerson);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const people = await personRepository.retrieveAll({ title });

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const person = await personRepository.retrieveById(id);

      if (person) res.status(200).send(person);
      else
        res.status(404).send({
          message: `Cannot find Person with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Person with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let person: Person = req.body;
    person.id = parseInt(req.params.id);

    try {
      const num = await personRepository.update(person);

      if (num == 1) {
        res.send({
          message: "Person was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Person with id=${person.id}. Maybe Person was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Person with id=${person.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await personRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Person was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Person with id=${id}. Maybe Person was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Person with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await personRepository.deleteAll();

      res.send({ message: `${num} people were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all people."
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const people = await personRepository.retrieveAll({ published: true });

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }
}
