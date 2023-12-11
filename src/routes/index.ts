import { Application } from "express";
import usersRoutes from "./user.routes";
import companiesRoutes from "./company.routes";
import peopleRoutes from "./person.routes";
import homeRoutes from "./home.routes";
import categoriesRoutes from "./category.routes";
import activationDateRoutes from "./activation-date.routes";
import geograficScopeRoutes from "./geografic-scope.routes";
import mediaChannelRoutes from "./media-channel.routes";
import contentElementRoutes from "./content-element.routes";
import complianceMeasureRoute from "./compliance-measure.route";
import metricRoutes from "./metric.routes";
import endorseRoutes from "./endorse.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/people", peopleRoutes);
    app.use("/api/companies", companiesRoutes);
    app.use("/api/categories", categoriesRoutes);
    app.use("/api/activationDates", activationDateRoutes);
    app.use("/api/geograficScopes", geograficScopeRoutes);
    app.use("/api/mediaChannels", mediaChannelRoutes);
    app.use("/api/contentElements", contentElementRoutes);
    app.use("/api/complianceMeasures", complianceMeasureRoute);
    app.use("/api/metrics", metricRoutes);
    app.use("/api/endorsements", endorseRoutes);
  }
}