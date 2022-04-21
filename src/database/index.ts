import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

mongoose.Promise = global.Promise;

export default mongoose;
