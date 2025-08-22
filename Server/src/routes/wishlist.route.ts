import express from "express";
import {
  clearWish,
  createWish,
  getAllWish,
} from "../controllers/wishlist.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { onlyUser } from "../types/global.types";

const router = express.Router();

//getall
router.post("/", authenticate(onlyUser), createWish);
router.delete("/", authenticate(onlyUser), clearWish);

router.get("/", authenticate(onlyUser), getAllWish);
export default router;
