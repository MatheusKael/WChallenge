import mongoose from "../index";
import { IRequest } from "./IRequest";

const RequestSchema = new mongoose.Schema<IRequest>({
  client_ip: String,
  execution_time: Number,
  http_status_code: Number,
});

const RequestModel = mongoose.model<IRequest>("Request", RequestSchema);

export { RequestModel };
