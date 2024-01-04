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
import requestRoutes from "./request.routes";
import requestHistoryRoutes from "./request-history.routes";
import express from "express";
import authRoute from "./auth.route";
import termAndConditionRoute from "./term-and-condition.route";
import storageRoute from "./storage.route";
import postRoute from "./post.route";
import followerRoute from "./follower.route";
import tagRoute from "./tag.route";
import notificationRoute from "./notification.route";
import addressRoute from "./address.route";

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
      path: '/requests',
      route: requestRoutes,
    },
    { 
      path: '/requestHistory',
      route: requestHistoryRoutes,
    },
    { 
      path: '/termsAndConditions',
      route: termAndConditionRoute,
    },
    { 
      path: '/files',
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
    { 
      path: '/tags',
      route: tagRoute,
    },
    { 
      path: '/notifications',
      route: notificationRoute,
    },
    { 
      path: '/addresses',
      route: addressRoute,
    },
  ];

  constructor() {
    this.defaultRoutes.forEach((route) => {
      this.router.use(route.path, route.route);
    });
  }
}

export default new Routes();