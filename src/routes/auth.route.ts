import express, { Router } from "express";
import { register } from "../controllers/auth.controller";

const router = express();

//Register user
router.post("/register", register);

export default router;
