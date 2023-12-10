
import { Router } from "express";
import ContentElementController from "../controllers/content-element.controller";

class ContentElementRoutes {
  router = Router();
  controller = new ContentElementController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new ContentElement
    this.router.post("/", this.controller.create);

    // Retrieve all ContentElements
    this.router.get("/", this.controller.findAll);

    // Update a ContentElement with id
    this.router.put("/:id", this.controller.update);

    // Delete a ContentElement with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new ContentElementRoutes().router;
