import express, { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = express();

//Register user
router.post("/register", register);
router.post("/login", login);

export default router;
