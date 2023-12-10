
import { Router } from "express";
import CategoryController from "../controllers/category.controller";

class CategoryRoutes {
  router = Router();
  controller = new CategoryController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Category
    this.router.post("/", this.controller.create);

    // Retrieve all Categorys
    this.router.get("/", this.controller.findAll);

    // Retrieve all published Categorys
    this.router.get("/published", this.controller.findAllPublished);

    // Retrieve a single Category with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Category with id
    this.router.put("/:id", this.controller.update);

    // Delete a Category with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new CategoryRoutes().router;
