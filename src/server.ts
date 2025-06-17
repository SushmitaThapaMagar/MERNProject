//root file

import "dotenv/config";

import express from "express";
import { connectDb } from "./config/db-connect";
import authRoutes from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI ?? "";

//connecing database
connectDb(DB_URI);

//using middlewares
//extended : true is used for object is the obj is nested
app.use(express.urlencoded({ extended: true })); //this let you recover the undefined when we post api
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

//using routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
