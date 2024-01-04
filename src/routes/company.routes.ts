import { Router } from "express";
import CompanyController from "../controllers/company.controller";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { companyValidation } from "../validations";

class CompanyRoutes {
  router = Router();
  controller = new CompanyController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/getAllIndustries", this.controller.getAllIndustries);
    this.router.post("/getCompanies", auth('autoManagement'), validate(companyValidation.getCompanies), this.controller.getCompanies);

    this.router.post("/", auth('manageUsers'), this.controller.create);
    this.router.get("/", auth('manageUsers'), this.controller.findAll);
    this.router.get("/published", auth('manageUsers'),this.controller.findAllPublished);
    this.router.get("/:id", auth('manageUsers'), this.controller.findOneCompany);
    this.router.put("/:id", auth('manageUsers'), this.controller.update);
    this.router.delete("/:id", auth('manageUsers'), this.controller.delete);
    this.router.delete("/", auth('manageUsers'), this.controller.deleteAll);

    this.router.get("/findByindustry/:industryId", auth('autoManagement'), this.controller.findByIndustry);
  }
}

export default new CompanyRoutes().router;
