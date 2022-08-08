import fs from "node:fs";
import { collection } from "../database/schemas/RequestSchema";
import { AppError } from "../errors/AppError";
import { QUERY_LOGS_FILE_PATH } from "../conf/query_logs";
import { QUERIES_LOGS_FILE_ENABLE } from "../../serverconfig.json";

async function queryLogsFilePath() {
  const collectionResolved = await collection;

  if (!collectionResolved) {
    throw new AppError("Collection not found", 500);
  }

  const changeStream = collectionResolved.watch();

  changeStream.on("change", (change) => {
    fs.appendFile(
      QUERY_LOGS_FILE_PATH,
      `${change.operationType} at ${JSON.stringify(change.ns)}\n`,
      (err) => {
        if (err) {
          throw new AppError(err.message, 500);
        }
      }
    );
  });
}

QUERIES_LOGS_FILE_ENABLE && queryLogsFilePath();
