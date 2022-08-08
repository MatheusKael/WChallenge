import fs from "fs";
import path from "path";
import { parseAsync } from "json2csv";
import { RequestModel } from "../database/schemas/RequestSchema";
import { AppError } from "../errors/AppError";
import {
  DATA_TO_LOGS_LOOP_TIME_MS,
  DATA_TO_LOGS_ENABLE,
} from "../../serverconfig.json";

// TODO => Hot swapping

const LOGS_FILE_PATH = path.resolve(__dirname, "..", "..", "logs");

async function DataToLogsFile() {
  const data = await RequestModel.find({});

  const fields = ["client_ip", "execution_time", "http_status_code"];

  const csv = await parseAsync(data, { fields });

  fs.createWriteStream(`${LOGS_FILE_PATH}/logs.csv`).write(csv, (err) => {
    if (err) {
      throw new AppError(err.message, 500);
    }

    console.log("Logs file created!");
  });
}

DATA_TO_LOGS_ENABLE && setInterval(DataToLogsFile, DATA_TO_LOGS_LOOP_TIME_MS);
