import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/category.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { Role } from "../types/global.types";

const router = express.Router();

// /category

//category post route
router.post("/", authenticate([Role.ADMIN]), create);
//get all categories
router.get("/", getAll);
//getbyId
router.get("/:id", authenticate(), getById);

//update
router.put("/:id", authenticate(), authenticate([Role.ADMIN]), update);

//remove
router.delete("/:id", authenticate(), authenticate([Role.ADMIN]), remove);
export default router;
