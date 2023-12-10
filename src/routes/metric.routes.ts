
import { Router } from "express";
import MetricController from "../controllers/metric.controller";

class MetricRoutes {
  router = Router();
  controller = new MetricController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Metric
    this.router.post("/", this.controller.create);

    // Retrieve all Metrics
    this.router.get("/", this.controller.findAll);

    // Update a Metric with id
    this.router.put("/:id", this.controller.update);

    // Delete a Metric with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new MetricRoutes().router;
