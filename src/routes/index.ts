import { Router } from "express";
import { calculatorRouter } from "./calculator.routes";

const routes = Router();

routes.use("/calculator", calculatorRouter);

export { routes };
