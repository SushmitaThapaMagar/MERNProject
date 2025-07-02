import express, { Router } from "express";
import { createCart } from "../controllers/cart.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { onlyUser } from "../types/global.types";

const router = express.Router();

router.post("/", authenticate(onlyUser), createCart);
export default router;
