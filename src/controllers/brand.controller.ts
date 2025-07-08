//brand APIS

import { Request, Response } from "express";
import Brand from "../models/brand.model";
import { asyncHandler } from "../utils/async-handler.utils";
import CustomError from "../middlewares/error-handler.middleware";

//create (post method)
export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    throw new CustomError("Brand already exists", 400);
  }

  const brand = await Brand.create({ name, description });

  res.status(201).json({
    message: "Brand created successfully",
    success: true,
    data: brand,
  });
});

//getAll brands (get method)
export const getAllBrands = asyncHandler(
  async (req: Request, res: Response) => {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Brands fetched successfully",
      success: true,
      data: brands,
    });
  }
);

//getby id (get method)
export const getBrandById = asyncHandler(
  async (req: Request, res: Response) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      throw new CustomError("Brand not found", 404);
    }
    res.status(200).json({
      message: "Brand fetched successfully",
      success: true,
      data: brand,
    });
  }
);

//update (put method)
export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const updatedbrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );

  if (!updatedbrand) {
    throw new CustomError("Brand not found", 404);
  }

  res.status(200).json({
    message: "Brand updated successfully",
    success: true,
    data: updatedbrand,
  });
});

//delete brand (delete)
export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
  if (!deletedBrand) {
    throw new CustomError("Brand not found", 404);
  }
  res.status(200).json({
    message: "Brand deleted successfully",
    success: true,
    data: deletedBrand,
  });
});
