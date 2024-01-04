import { Response } from "express";
import Request from "../models/request-copyright.model";
import requestRepository from "../repositories/request.repository";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

export default class RequestController {
  async create(req: any, res: Response) {
    try {
      const request: Request = req.body;

      if(request.userId!=req.user.id) {
        throw new ApiError(httpStatus.LOCKED, 'The copyright you want to update is from another user!');
      }

      const savedRequest = await requestRepository.save(request);

      res.status(201).send(savedRequest);
    } catch (err) {
      console.log(err)

      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: any, res: Response) {
    try {
      const people = await requestRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: any, res: Response) {
    let request: Request = req.body;
    request.id = parseInt(req.params.id);

    try {
      const num = await requestRepository.update(request);

      if (num == 1) {
        res.send({
          message: "Request was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Request with id=${request.id}. Maybe Request was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Request with id=${request.id}.`
      });
    }
  }

  async delete(req: any, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await requestRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Request was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Request with id=${id}. Maybe Request was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Request with id==${id}.`
      });
    }
  }
}
