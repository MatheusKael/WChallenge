import { Router, Request, Response } from "express";
import { RequestModel } from "../database/schemas/RequestSchema";

const calculatorRouter = Router();

calculatorRouter.post("/sum", async (request: Request, response: Response) => {
  const { a, b } = request.body;

  const sum = Number(a) + Number(b);

  const request_information = await RequestModel.create({
    client_ip: request.ip,
    execution_time: Date.now(),
    http_status_code: 200,
  });

  const request_id = request_information._id as string;

  response.header("request_id", request_id);

  return response.status(200).json({ sum });
});

calculatorRouter.post(
  "/multi",
  async (request: Request, response: Response) => {
    const { a, b } = request.body;

    const multi = Number(a) * Number(b);

    await RequestModel.create({
      client_ip: request.ip,
      execution_time: Date.now(),
      http_status_code: 200,
    });
    return response.status(200).json({ multiplication: multi });
  }
);

export { calculatorRouter };
