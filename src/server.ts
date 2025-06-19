//root file

import "dotenv/config";
import helmet from "helmet";

import express, { NextFunction, Request, Response } from "express";
import { connectDb } from "./config/db-connect";
import authRoutes from "./routes/auth.route";
import CustomError, {
  errorHandler,
} from "./middlewares/error-handler.middleware";

import categoryRoutes from "./routes/category.route";

const app = express();
const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI ?? "";

//connecing database
connectDb(DB_URI);

//using middlewares
//extended : true is used for object is the obj is nested
app.use(express.urlencoded({ extended: true })); //this let you recover the undefined when we post api
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

//using routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.all("/{*spalt}", (req: Request, res: Response, next: NextFunction) => {
  const message = `Can not ${req.method} on ${req.url}`;
  const error = new CustomError(message, 404);
  next(error);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(errorHandler);
