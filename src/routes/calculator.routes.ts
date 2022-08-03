import { Router, Request, Response } from "express";
import { RequestModel } from "../database/schemas/RequestSchema";

const calculatorRouter = Router();

type OperationsObj = {
  [key: string]: (a: number, b: number) => number;
};

// TODO => Add documentation to explain each possible operation

calculatorRouter.post(
  "/:operation",
  async (request: Request, response: Response) => {
    const { operation } = request.params;
    const { a, b } = request.body;

    const operationsObj: OperationsObj = {
      sum: (a: number, b: number) => a + b,
      sub: (a: number, b: number) => a - b,
      mul: (a: number, b: number) => a * b,
      div: (a: number, b: number) => a / b,
    };

    const result = operationsObj[operation](a, b);

    const request_information = await RequestModel.create({
      client_ip: request.ip,
      execution_time: Date.now(),
      http_status_code: 200,
    });

    const request_id = request_information._id as string;

    response.header("request_id", request_id);

    return response.status(200).json({ result });
  }
);

export { calculatorRouter };
