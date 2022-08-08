import path from "node:path";

const QUERY_LOGS_FILE_FOLDER_PATH = path.resolve(__dirname, "..", "..", "logs");
const QUERY_LOGS_FILE_PATH = `${QUERY_LOGS_FILE_FOLDER_PATH}/query_logs.txt`;

export { QUERY_LOGS_FILE_PATH };
