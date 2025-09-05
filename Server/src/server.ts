//root file

import "dotenv/config";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { connectDb } from "./config/db-connect";
import authRoutes from "./routes/auth.route";
import CustomError, {
  errorHandler,
} from "./middlewares/error-handler.middleware";

import categoryRoutes from "./routes/category.route";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";
import wishlistRoutes from "./routes/wishlist.route";
import orderRoutes from "./routes/order.route";
import brandRoutes from "./routes/brand.route";
import userRoutes from "./routes/user.route";

const app = express();

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI ?? "";

//connecing database
connectDb(DB_URI);

//using middlewares
app.use(
  cors({
    origin: process.env.FORNT_END_URL || "http://localhost:3000",
    credentials: true,
  })
);

//extended : true is used for object is the obgi
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

//parse cooke

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

//using routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/user", userRoutes);

app.all("/{*spalt}", (req: Request, res: Response, next: NextFunction) => {
  const message = `Can not ${req.method} on ${req.url}`;
  const error = new CustomError(message, 404);
  next(error);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(errorHandler);
