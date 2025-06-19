import CustomError from "../middlewares/error-handler.middleware";
import Category from "../models/category.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";

//post category
export const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const category = await Category.create({ name, description });

  if (!category) {
    throw new CustomError("Some went wrong", 500);
  }

  res.status(201).json({
    message: "Category Created.",
    success: true,
    status: "success",
    data: category,
  });
});

//get all categories

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.status(200).json({
    message: "All category fetched",
    success: true,
    status: "success",
    data: categories,
  });
});

//getbyId categories

export const getById = asyncHandler(async (req: Request, res: Response) => {
  //get id from req.params
  const { id } = req.params; //req.params refers to an object that contains route parameters

  //get category bi given id
  const category = await Category.findById(id);
  if (!category) {
    throw new CustomError("Category not found", 400);
  }
  res.status(200).json({
    message: ` Category by id ${id} fetched`,
    success: true,
    status: "success",
    data: category,
  });
});

//update category
export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, description } = req.body;
  const updatedcategory = await Category.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );

  if (!updatedcategory) {
    throw new CustomError("Updated Category Not Found", 400);
  }
  res.status(200).json({
    message: "Category updated successfully",
    success: true,
    status: "success",
    data: updatedcategory,
  });
});

//delete categories
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletecategory = await Category.findByIdAndDelete(id, { new: true });

  if (!deletecategory) {
    throw new CustomError("Deleted Category Not Found", 400);
  }
  res.status(200).json({
    message: "Category deleted successfully!",
    success: true,
    status: "success",
    data: null,
  });
});
