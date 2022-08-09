import { Response, Request } from "express";
import { RequestModel } from "../../database/schemas/RequestSchema";
import OperationsObj from "../utils/OperationsObject";

class OperationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { operation } = request.params;
    const { a, b } = request.body;

    const result = OperationsObj[operation](a, b);

    const request_information = await RequestModel.create({
      client_ip: request.ip,
      execution_time: Date.now(),
      http_status_code: 200,
    });

    const request_id = request_information._id as string;

    response.header("request_id", request_id);

    return response.status(200).json({ result });
  }
}

export { OperationController };
