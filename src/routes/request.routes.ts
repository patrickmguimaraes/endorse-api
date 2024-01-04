
import { Router } from "express";
import RequestController from "../controllers/request.controller";
import { auth } from "../middlewares/auth";

class RequestRoutes {
  router = Router();
  controller = new RequestController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", auth('post'), this.controller.create);
    this.router.get("/", auth('post'), this.controller.findAll);
    this.router.put("/:id", auth('post'), this.controller.update);
    this.router.delete("/:id", auth('post'), this.controller.delete);
  }
}

export default new RequestRoutes().router;
