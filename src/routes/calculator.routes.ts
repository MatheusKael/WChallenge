import { Router } from "express";
import { OperationController } from "../calculator/controllers/OperationController";

const calculatorRouter = Router();

const operationController = new OperationController();

// TODO => Add documentation to explain each possible operation

calculatorRouter.post("/:operation", operationController.handle);

export { calculatorRouter };
