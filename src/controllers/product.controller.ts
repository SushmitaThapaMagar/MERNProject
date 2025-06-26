import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import Product from "../models/product.model";

// name
// price
// description
// stock
// brand
// isFeatured

//post products
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;

    const { coverImage, images } = req.files as {
      coverImage: Express.Multer.File[];
      images: Express.Multer.File[];
    };

    if (!coverImage || coverImage.length === 0) {
      throw new CustomError("Cover image is Required", 404);
    }

    const product = new Product(data);

    product.coverImage = {
      path: coverImage[0].path,
      public_id: coverImage[0].filename,
    };
    await product.save();

    if (!product) {
      throw new CustomError("Something went wrong", 500);
    }
    res.status(201).json({
      //201 success
      message: "Product Created.",
      success: true,
      status: "success",
      data: product,
    });
  }
);

//get all products

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json({
      message: "All Products fetched",
      success: true,
      status: "success",
      data: products,
    });
  }
);

//getbyId products

export const getByIdProduct = asyncHandler(
  async (req: Request, res: Response) => {
    //get id from req.params
    const { id } = req.params; //req.params refers to an object that contains route parameters

    //get category bi given id
    const product = await Product.findById(id);
    if (!product) {
      throw new CustomError("Product not found", 404);
    }
    res.status(200).json({
      message: ` Product by id ${id} fetched`,
      success: true,
      status: "success",
      data: product,
    });
  }
);

//update products
export const updateProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, price, description, stock, brand, isFeatured } = req.body;
    const updatedproduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, stock, brand, isFeatured },
      { new: true } //return the document as it was before the update
    );

    if (!updatedproduct) {
      throw new CustomError("Updated Product Not Found", 404);
    }
    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      status: "success",
      data: updatedproduct,
    });
  }
);

//delete products
export const removeProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteproduct = await Product.findByIdAndDelete(id, { new: true });

    if (!deleteproduct) {
      throw new CustomError("Deleted product Not Found", 404);
    }
    res.status(200).json({
      message: "Product deleted successfully!",
      success: true,
      status: "success",
      data: null,
    });
  }
);
