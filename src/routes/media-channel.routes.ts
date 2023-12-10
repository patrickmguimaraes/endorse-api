
import { Router } from "express";
import MediaChannelController from "../controllers/media-channel.controller";

class MediaChannelRoutes {
  router = Router();
  controller = new MediaChannelController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new MediaChannel
    this.router.post("/", this.controller.create);

    // Retrieve all MediaChannels
    this.router.get("/", this.controller.findAll);

    // Update a MediaChannel with id
    this.router.put("/:id", this.controller.update);

    // Delete a MediaChannel with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new MediaChannelRoutes().router;
