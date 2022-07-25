import { Router } from "express";
import { calculatorRouter } from "./calculator.routes";
import { validationRouter } from "./validation.routes";

const routes = Router();

routes.use("/calculator", calculatorRouter);
routes.use("/validation", validationRouter);

export { routes };
