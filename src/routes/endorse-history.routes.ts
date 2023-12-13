
import { Router } from "express";
import EndorseHistoryController from "../controllers/endorse-history.controller";

class EndorseHistoryRoutes {
  router = Router();
  controller = new EndorseHistoryController();

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

    this.router.get("/mountMyHistory/:id", this.controller.mountMyHistory);
  }
}

export default new EndorseHistoryRoutes().router;
