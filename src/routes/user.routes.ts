import { Router } from "express";
import UserController from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userValidation } from "../validations";
import { auth } from "../middlewares/auth";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/search', auth('autoManagement'), validate(userValidation.search), this.controller.search);
    this.router.post('/username', validate(userValidation.findByUsername), this.controller.findByUsername);
    this.router.post('/retriveAllEmployees', auth('autoManagement'), validate(userValidation.retriveAllEmployees), this.controller.retriveAllEmployees);

    this.router.get("/login/:id", this.controller.login);

    this.router.get("/exists/:id", this.controller.existsEmail);

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

    this.router.post("/attachProfilePicture/:id", this.controller.attachProfilePicture);
  } 
}

export default new UserRoutes().router;
