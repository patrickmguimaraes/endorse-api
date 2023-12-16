import { Application, Router } from "express";
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
import endorseHistoryRoutes from "./endorse-history.routes";
import express from "express";
import authRoute from "./auth.route";
import termAndConditionRoute from "./term-and-condition.route";
import storageRoute from "./storage.route";
import postRoute from "./post.route";
import followerRoute from "./follower.route";

class Routes {
  public router = express.Router();

  public defaultRoutes = [
    {
      path: '/auth',
      route: authRoute,
    },
    {
      path: '/users',
      route: usersRoutes,
    },
    {
      path: '/people',
      route: peopleRoutes,
    },
    {
      path: '/companies',
      route: companiesRoutes,
    },
    {
      path: '/categories',
      route: categoriesRoutes,
    },
    { 
      path: '/activationDates',
      route: activationDateRoutes,
    },
    { 
      path: '/geograficScopes',
      route: geograficScopeRoutes,
    },
    { 
      path: '/mediaChannels',
      route: mediaChannelRoutes,
    },
    { 
      path: '/contentElements',
      route: contentElementRoutes,
    },
    { 
      path: '/complianceMeasures',
      route: complianceMeasureRoute,
    },
    { 
      path: '/metrics',
      route: metricRoutes,
    },
    { 
      path: '/endorsements',
      route: endorseRoutes,
    },
    { 
      path: '/endorseHistory',
      route: endorseHistoryRoutes,
    },
    { 
      path: '/termsAndConditions',
      route: termAndConditionRoute,
    },
    { 
      path: '/storage',
      route: storageRoute,
    },
    { 
      path: '/posts',
      route: postRoute,
    },
    { 
      path: '/followers',
      route: followerRoute,
    },
  ];

  constructor() {
    this.defaultRoutes.forEach((route) => {
      this.router.use(route.path, route.route);
    });
  }
}

export default new Routes();