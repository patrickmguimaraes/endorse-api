import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import Database from "./db";
import OpenAIApi from "./openAI/index"
import fileUpload from "express-fileupload";
import path from "path";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Routes(app);
    new OpenAIApi(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8100"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/files', express.static(path.join(__dirname, '../../storage')))
  }

  private syncDatabase(): void {
    const db = new Database();
    
    db.sync();
  }
}
