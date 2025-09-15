import express, { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";

const router = express.Router();

//Register user
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
