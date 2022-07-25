import { Router, Request, Response } from "express";
import { RequestModel } from "../database/schemas/RequestSchema";

const validationRouter = Router();

validationRouter.get(
  "/validate/:id",
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const request_found = await RequestModel.findById(id);

    return response.status(200).json({ request_found });
  }
);

export { validationRouter };
