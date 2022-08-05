import { EventEmitter } from "node:events";
import fs from "node:fs";
import path from "node:path";
import { parseAsync } from "json2csv";
import { AppError } from "../errors/AppError";
import { RequestModel } from "../database/schemas/RequestSchema";

const QUERY_LOGS_FILE_PATH = path.resolve(__dirname, "..", "..", "logs");

// TODO => Query logs file use should be configurable
// TODO => Same Queries should not be overwritten

type Query = {
  statement: string;
  operation: string;
  result: string;
};

export async function getQueryLogsFilePath(query: Query) {
  const fields = ["statement", "operation", "result"];
  const csv = await parseAsync(query, { fields });

  fs.createWriteStream(`${QUERY_LOGS_FILE_PATH}/query_logs.csv`).write(
    csv,
    (err) => {
      if (err) {
        throw new AppError(err.message, 500);
      }

      console.log("Logs file created!");
    }
  );
}
