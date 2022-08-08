import mongoose from "../index";
import { IRequest } from "./IRequest";

const RequestSchema = new mongoose.Schema<IRequest>(
  {
    client_ip: String,
    execution_time: Number,
    http_status_code: Number,
  },
  { autoCreate: false }
);

const RequestModel = mongoose.model<IRequest>("Request", RequestSchema);

const collection = RequestModel.createCollection()
  .then((collection) => {
    console.log("Request collection created");

    return collection;
  })
  .catch((err) => {
    console.error(err);
  });

export { RequestModel, collection };
