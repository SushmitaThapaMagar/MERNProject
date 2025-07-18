import express from "express";
import {
  createProduct,
  getAllProducts,
  getByCategory,
  getByIdProduct,
  getFeaturedProducts,
  removeProduct,
  updateProducts,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { onlyAdmin } from "../types/global.types";
import { uploader } from "../middlewares/file-uploader.middleware";

const upload = uploader();
const router = express.Router();

//getall
router.get("/", getAllProducts);

//get featured products
router.get("/featured", getFeaturedProducts);

//get products by category id
router.get("/category/:CategoryId", getByCategory);

//getbyid
router.get("/:id", getByIdProduct);

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

//update
router.put(
  "/:id",
  authenticate(onlyAdmin),
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateProducts
);
//removeproduct
router.delete("/:id", authenticate(onlyAdmin), removeProduct);

export default router;
