import { Request, Response } from "express";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

export default class UserController {
  async login(req: Request, res: Response) {
    try {
      const user = await userRepository.login({ authId: req.params.id});
      
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users."
      });
    }
  }

  async existsEmail(req: Request, res: Response) {
    try {
      const user = await userRepository.existsEmail(req.params.id);

      res.status(200).send(user!=null);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while existsEmail."
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
      const user: User = req.body;
  
      const savedUser = await userRepository.save(user);

      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while saving user."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const users = await userRepository.retrieveAll({ title });

      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const user = await userRepository.retrieveById(id);

      if (user) res.status(200).send(user);
      else
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let user: User = req.body;
    user.id = parseInt(req.params.id);

    try {
      const num = await userRepository.update(user);

      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with id=${user.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await userRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await userRepository.deleteAll();

      res.send({ message: `${num} Users were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all users."
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const users = await userRepository.retrieveAll({ published: true });

      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users."
      });
    }
  }

  async attachProfilePicture(req: Request, res: Response) {
    try {
      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;
      let name: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage/users/' + parseInt(req.params.id)))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage/users/' + parseInt(req.params.id)), { recursive: true });
      }

      sampleFile = req.files.sampleFile as fileUpload.UploadedFile;
      name = parseInt(req.params.id) + "/profile.png";
      uploadPath = path.join(__dirname, '../../../storage/users/' + name);

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

  async search(req: Request, res: Response) {
    try {
      const users = await userRepository.search(req.body.searchText);
      
      res.status(200).send(users);
    } catch (err) {
      console.log(err)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'The search has a problem. Try later...');
    }
  }

  async findByUsername(req: Request, res: Response) {
    try {
      const user = await userRepository.findByUsername(req.body.username);
      
      res.status(200).send(user);
    } catch (err) {
      console.log(err)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'We had a problem looking for this user. Try later...');
    }
  }

  async retriveAllEmployees(req: Request, res: Response) {
    try {
      const user = await userRepository.retriveAllEmployees(req.body.companiesId);
      
      res.status(200).send(user);
    } catch (err) {
      console.log(err)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'We had a problem looking for this user. Try later...');
    }
  }
}
