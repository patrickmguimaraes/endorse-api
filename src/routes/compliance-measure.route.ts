
import { Router } from "express";
import ComplianceMeasureController from "../controllers/compliance-measure.controller";

class ComplianceMeasureRoutes {
  router = Router();
  controller = new ComplianceMeasureController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new ComplianceMeasure
    this.router.post("/", this.controller.create);

    // Retrieve all ComplianceMeasures
    this.router.get("/", this.controller.findAll);

    // Update a ComplianceMeasure with id
    this.router.put("/:id", this.controller.update);

    // Delete a ComplianceMeasure with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new ComplianceMeasureRoutes().router;
