import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new User
    this.router.post("/", this.controller.create);

    // Retrieve all Users
    this.router.get("/", this.controller.findAll);

    // Retrieve all published Users
    this.router.get("/published", this.controller.findAllPublished);

    // Retrieve a single User with id
    this.router.get("/:id", this.controller.findOne);

    // Update a User with id
    this.router.put("/:id", this.controller.update);

    // Delete a User with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Users
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new UserRoutes().router;
