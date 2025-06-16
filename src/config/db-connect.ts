import mongoose from "mongoose";

export const connectDb = (uri: string) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      //error handling
      console.log(err);
      process.exit(1); // used to stop the Node.js process immediately
    });
};
