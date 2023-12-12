
import { Router } from "express";
import EndorseController from "../controllers/endorse.controller";

class EndorseRoutes {
  router = Router();
  controller = new EndorseController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Endorse
    this.router.post("/", this.controller.create);

    // Retrieve all Endorses
    this.router.get("/", this.controller.findAll);

    // Update a Endorse with id
    this.router.put("/:id", this.controller.update);

    // Delete a Endorse with id
    this.router.delete("/:id", this.controller.delete);

    this.router.post("/attachFile", this.controller.attachFile);
  }
}

export default new EndorseRoutes().router;
