import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/category.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

// /category

//category post route
router.post("/", authenticate(), create);
//get all categories
router.get("/", getAll);
//getbyId
router.get("/:id", getById);

//update
router.put("/:id", update);

//remove
router.delete("/:id", remove);
export default router;
