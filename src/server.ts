import "dotenv/config";

import express from "express";
import { connectDb } from "./config/db-connect";

const app = express();
const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI ?? "";

//connecing database
connectDb(DB_URI);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is sunning at http://localhost:${PORT}`);
});
