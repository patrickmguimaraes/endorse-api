
import { Router } from "express";
import RequestController from "../controllers/request.controller";

class RequestRoutes {
  router = Router();
  controller = new RequestController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Request
    this.router.post("/", this.controller.create);

    // Retrieve all Requests
    this.router.get("/", this.controller.findAll);

    // Update a Request with id
    this.router.put("/:id", this.controller.update);

    // Delete a Request with id
    this.router.delete("/:id", this.controller.delete);

    this.router.post("/attachFile", this.controller.attachFile);
  }
}

export default new RequestRoutes().router;
