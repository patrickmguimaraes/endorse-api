import express, { Application, Router } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import Database from "./db";
import OpenAIApi from "./openAI/index"
import fileUpload from "express-fileupload";
import path from "path";
import helmet from "helmet";
//import xss from "xss-clean";
import compression from "compression";
import passport from "passport";
import { jwtStrategy } from "./config/passport";
import { config } from "./config/db.config";
import { authLimiter } from "./middlewares/rateLimiter";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import { errorConverter, errorHandler } from "./middlewares/error";
import routes from "./routes";
import { auth } from "./middlewares/auth";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new OpenAIApi(app);
  }

  private config(app: Application): void {
    // set security HTTP headers
    app.use(helmet());

    const corsOptions: CorsOptions = {
      origin: ["https://endorseanidea.com", "http://localhost:8100"]
    };

    app.use(cors(corsOptions));

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    // sanitize request data
    //app.use(xss());

    app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));

    console.log(path.join(__dirname, '../../storage'))
    app.use('/files', auth('private-files'), express.static(path.join(__dirname, '../../storage')))
    app.use('/storage', express.static(path.join(__dirname, '../../storage-public')))

    // gzip compression
    app.use(compression());

    // jwt authentication
    app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);

    // limit repeated failed requests to auth endpoints
    if (config.env === 'production') {
      app.use('/v1/auth', authLimiter);
    }
    
    // v1 api routes
    app.use('/v1', routes.router);

    app.use('/', (req, res) => {
      res.send('>>>>> Endorse')
    })

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });

    // convert error to ApiError, if needed
    app.use(errorConverter);

    // handle error
    app.use(errorHandler);
  }

  private async syncDatabase() {
    const db = new Database();
  }
}
