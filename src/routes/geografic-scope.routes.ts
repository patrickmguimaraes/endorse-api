
import { Router } from "express";
import GeograficScopeController from "../controllers/geografic-scope.controller";

class GeograficScopeRoutes {
  router = Router();
  controller = new GeograficScopeController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new GeograficScope
    this.router.post("/", this.controller.create);

    // Retrieve all GeograficScopes
    this.router.get("/", this.controller.findAll);

    // Update a GeograficScope with id
    this.router.put("/:id", this.controller.update);

    // Delete a GeograficScope with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new GeograficScopeRoutes().router;
