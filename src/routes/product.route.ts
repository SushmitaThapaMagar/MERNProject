import express from "express";
import {
  createProduct,
  getAllProducts,
  getByIdProduct,
  removeProduct,
  updateProducts,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { onlyAdmin } from "../types/global.types";
import { uploader } from "../middlewares/file-uploader.middleware";

const upload = uploader();
const router = express.Router();

//post product
router.post(
  "/",
  authenticate(onlyAdmin),
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct
);
//getall
router.get("/", getAllProducts);
//getbyid
router.get("/:id", getByIdProduct);
//update
router.put("/:id", authenticate(onlyAdmin), updateProducts);
//removeproduct
router.delete("/:id", authenticate(onlyAdmin), removeProduct);

export default router;
