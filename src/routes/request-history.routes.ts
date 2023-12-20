
import { Router } from "express";
import RequestHistoryController from "../controllers/request-history.controller";

class RequestHistoryRoutes {
  router = Router();
  controller = new RequestHistoryController();

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

    this.router.get("/mountMyHistory/:id", this.controller.mountMyHistory);
  }
}

export default new RequestHistoryRoutes().router;
