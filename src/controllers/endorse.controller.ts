import { Request, Response } from "express";
import Endorse from "../models/endorse.model";
import endorseRepository from "../repositories/endorse.repository";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";

export default class EndorseController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const endorse: Endorse = req.body;

      const savedEndorse = await endorseRepository.save(endorse);

      res.status(201).send(savedEndorse);
    } catch (err) {
      console.log(err)

      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await endorseRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let endorse: Endorse = req.body;
    endorse.id = parseInt(req.params.id);

    try {
      const num = await endorseRepository.update(endorse);

      if (num == 1) {
        res.send({
          message: "Endorse was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Endorse with id=${endorse.id}. Maybe Endorse was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Endorse with id=${endorse.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await endorseRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Endorse was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Endorse with id=${id}. Maybe Endorse was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Endorse with id==${id}.`
      });
    }
  }

  async attachFile(req: Request, res: Response) {
    try {
      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;
      let name: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage/endorse/'))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage/endorse/'), { recursive: true });
      }

      sampleFile = req.files.sampleFile as fileUpload.UploadedFile;
      name = new Date().getTime() + sampleFile.mimetype.replace("image/", ".").replace("application/", ".");
      uploadPath = path.join(__dirname, '../../../storage/endorse/' + name);

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
