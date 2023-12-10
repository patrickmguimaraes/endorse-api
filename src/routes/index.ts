import { Application } from "express";
import usersRoutes from "./user.routes";
import companiesRoutes from "./company.routes";
import peopleRoutes from "./person.routes";
import homeRoutes from "./home.routes";
import categoriesRoutes from "./category.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/people", peopleRoutes);
    app.use("/api/companies", companiesRoutes);
    app.use("/api/categories", categoriesRoutes);
  }
}
