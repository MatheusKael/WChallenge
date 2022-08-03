import express, { Request, Response, NextFunction } from "express";
import { MongooseError } from "mongoose";
import cors from "cors";
import "./services/DataToLogsFile";
import { AppError } from "./errors/AppError";
import "./database";
import { routes } from "./routes/index";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    } else if (err instanceof MongooseError) {
      return response.status(400).json({
        type: "MongooseError",
        name: err.name,
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen("3333", () => {
  console.log("Server started on port 3333!");
});
