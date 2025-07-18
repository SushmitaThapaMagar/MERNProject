import express, { Router } from "express";
import { clearCart, createCart, getCart } from "../controllers/cart.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { onlyUser } from "../types/global.types";

const router = express.Router();

router.post("/", authenticate(onlyUser), createCart);
router.get("/", authenticate(onlyUser), getCart);
router.delete("/clear", authenticate(onlyUser), clearCart);

export default router;
