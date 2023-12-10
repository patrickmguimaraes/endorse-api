import { Request, Response } from "express";
import MediaChannel from "../models/media-channel.model";
import mediaChannelRepository from "../repositories/media-channel.repository";

export default class MediaChannelController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const mediaChannel: MediaChannel = req.body;
      
      const savedMediaChannel = await mediaChannelRepository.save(mediaChannel);

      res.status(201).send(savedMediaChannel);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const people = await mediaChannelRepository.getAll();

      res.status(200).send(people);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving people."
      });
    }
  }

  async update(req: Request, res: Response) {
    let mediaChannel: MediaChannel = req.body;
    mediaChannel.id = parseInt(req.params.id);

    try {
      const num = await mediaChannelRepository.update(mediaChannel);

      if (num == 1) {
        res.send({
          message: "MediaChannel was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update MediaChannel with id=${mediaChannel.id}. Maybe MediaChannel was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating MediaChannel with id=${mediaChannel.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await mediaChannelRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "MediaChannel was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete MediaChannel with id=${id}. Maybe MediaChannel was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete MediaChannel with id==${id}.`
      });
    }
  }
}
