import { Application } from "express";
import usersRoutes from "./user.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/users", usersRoutes);
  }
}
