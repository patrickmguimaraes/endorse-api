
import { Router } from "express";
import ActivationDateController from "../controllers/activation-date.controller";

class ActivationDateRoutes {
  router = Router();
  controller = new ActivationDateController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new ActivationDate
    this.router.post("/", this.controller.create);

    // Retrieve all ActivationDates
    this.router.get("/", this.controller.findAll);

    // Update a ActivationDate with id
    this.router.put("/:id", this.controller.update);

    // Delete a ActivationDate with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new ActivationDateRoutes().router;
