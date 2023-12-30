import { Response } from "express";
import Request from "../models/request-copyright.model";
import requestRepository from "../repositories/request.repository";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";

export default class RequestController {
  async create(req: any, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const request: Request = req.body;

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

  async attachFile(req: any, res: Response) {
    try {
      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;
      let name: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage/request/'))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage/request/'), { recursive: true });
      }

      sampleFile = req.files.sampleFile as fileUpload.UploadedFile;
      name = new Date().getTime() + sampleFile.mimetype.replace("image/", ".").replace("application/", ".");
      uploadPath = path.join(__dirname, '../../../storage/request/' + name);

      sampleFile.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        
        res.send({name});
      });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while attaching a file."
      });
    }
  }
}
