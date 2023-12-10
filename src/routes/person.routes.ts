
import { Router } from "express";
import PersonController from "../controllers/person.controller";

class PersonRoutes {
  router = Router();
  controller = new PersonController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Person
    this.router.post("/", this.controller.create);

    // Retrieve all Persons
    this.router.get("/", this.controller.findAll);

    // Retrieve all published Persons
    this.router.get("/published", this.controller.findAllPublished);

    // Retrieve a single Person with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Person with id
    this.router.put("/:id", this.controller.update);

    // Delete a Person with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Persons
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new PersonRoutes().router;
