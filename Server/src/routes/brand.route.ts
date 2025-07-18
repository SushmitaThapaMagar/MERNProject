import express from "express";

//import { authenticate } from "../middleware/authenticate.middleware";
import { onlyAdmin } from "../types/global.types";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from "../controllers/brand.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

router.post("/", authenticate(onlyAdmin), createBrand);
router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.put("/:id", authenticate(onlyAdmin), updateBrand);
router.delete("/:id", authenticate(onlyAdmin), deleteBrand);

export default router;
