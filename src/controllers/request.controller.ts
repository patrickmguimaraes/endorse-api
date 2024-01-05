import { Response } from "express";
import Request from "../models/request-copyright.model";
import requestRepository from "../repositories/request.repository";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

export default class RequestController {
  async create(req: any, res: Response) {
    try {
      const request: Request = req.body;

      var hasPermission = false;

      if(request.id) {
        var reqOriginal = await requestRepository.getById(request.id);

        reqOriginal?.requestAssignments?.forEach(ra => {
          if(ra.email==req.user.email && ra.permission=='Edit') { hasPermission = true; }
        })
      }
      
      if((!request.id && request.userId!=req.user.id) || (request.id && !hasPermission)) {
        throw new ApiError(httpStatus.LOCKED, 'You do not have permission to edit it!');
      }

      var savedRequest;

      if(!request.id) {
        request.date = new Date();
        savedRequest = await requestRepository.save(request);
      }
      else {
        savedRequest = await requestRepository.update(request);

        request.requestComplianceMeasures
      }
      
      res.status(httpStatus.OK).send(savedRequest);
    } catch (err: any) {
      console.log(err.message)

      res.status(500).send({
        message: "Some error occurred while saving the request copyright."
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
