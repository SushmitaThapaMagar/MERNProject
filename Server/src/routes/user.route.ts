import express from "express";

import { onlyUser } from "../types/global.types";
import { deleteAccount, updateProfile } from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { login, logout, register } from "../controllers/auth.controller";

const router = express.Router(); //this is from the auth controller

router.post("/register", register); //this is from the auth controller

router.post("/login", login);
router.post("/logout", logout);

// router.get("/profile", authenticate(onlyUser), getProfile);

router.put("/profile", authenticate(onlyUser), updateProfile);

router.delete("/profile", authenticate(onlyUser), deleteAccount);

export default router;
