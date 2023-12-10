import { Router } from "express";
import CompanyController from "../controllers/company.controller";

class CompanyRoutes {
  router = Router();
  controller = new CompanyController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Company
    this.router.post("/", this.controller.create);

    // Retrieve all Companys
    this.router.get("/", this.controller.findAll);

    // Retrieve all published Companys
    this.router.get("/published", this.controller.findAllPublished);

    // Retrieve a single Company with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Company with id
    this.router.put("/:id", this.controller.update);

    // Delete a Company with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Companys
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new CompanyRoutes().router;
