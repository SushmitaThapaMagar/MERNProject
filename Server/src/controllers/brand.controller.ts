//brand APIS

import { Request, Response } from "express";
import Brand from "../models/brand.model";
import { asyncHandler } from "../utils/async-handler.utils";
import CustomError from "../middlewares/error-handler.middleware";

//create (post method) ==============
export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  console.log(req.body);
  // Check if values are provided
  if (!name || !description) {
    throw new CustomError("Name and description are required", 400);
  }
  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    throw new CustomError("Brand already exists", 400);
  }

  // Create the brand
  const brand = await Brand.create({ name, description });

  res.status(201).json({
    message: "Brand created successfully",
    success: true,
    data: brand,
  });
});

//getAll brands (get method)  ==============
export const getAllBrands = asyncHandler(
  async (req: Request, res: Response) => {
    const { query } = req.query;
    const filter: Record<string, any> = {}; // create object or filter is an object where you can filter anything you like
    console.log(query);

    //query
    if (query) {
      filter.$or = [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          descrition: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Brands fetched successfully",
      success: true,
      data: brands,
    });
  }
);

//getby id (get method) ==============
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

//update (put method)  ==============
export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  // //for logo
  // const { logo } = req.files as {
  //   logo: Express.Multer.File[];
  // };

  const updatedbrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );

  if (!updatedbrand) {
    throw new CustomError("Brand not found", 404);
  }

  // //update logo
  // if (logo) {
  //   if (updatedbrand.logo) {
  //   }
  // }
  res.status(200).json({
    message: "Brand updated successfully",
    success: true,
    data: updatedbrand,
  });
});

//delete brand (delete)  ==============
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
