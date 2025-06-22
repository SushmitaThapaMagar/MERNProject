import express from "express";
import {
  createProduct,
  getAllProducts,
  getByIdProduct,
  removeProduct,
  updateProducts,
} from "../controllers/product.controller";

const router = express.Router();

//post category
router.post("/", createProduct);
//getall
router.get("/", getAllProducts);
//getbyid
router.get("/:id", getByIdProduct);
//update
router.put("/:id", updateProducts);
//removeproduct
router.delete("/:id", removeProduct);

export default router;
