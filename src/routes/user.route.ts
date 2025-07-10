import express from "express";

import { onlyUser } from "../types/global.types";
import {
  deleteAccount,
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authenticate(onlyUser), getProfile);

router.put("/profile", authenticate(onlyUser), updateProfile);

router.delete("/profile", authenticate(onlyUser), deleteAccount);

export default router;
