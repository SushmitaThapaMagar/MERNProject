import CustomError from "../middlewares/error-handler.middleware";
import Product from "../models/product.model";
import User from "../models/user.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";

//Creating wishlist
export const createWish = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const { productId } = req.body;

  if (!productId) {
    throw new CustomError("ProductId is required", 400);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isProductAlreadyExits = user.wishlist.find(
    (wishlistProduct) => wishlistProduct.toString() === product._id.toString()
  );

  if (isProductAlreadyExits) {
    user.wishlist = user.wishlist.filter(
      (wishlistProduct) => wishlistProduct.toString() !== product._id.toString()
    );
  } else {
    user.wishlist.push(product._id);
  }

  await user.save();

  res.status(201).json({
    //ternary operator
    message: `${isProductAlreadyExits ? "Removed from " : "Added to"} wishlist`,
    status: "success",
    success: true,
    data: user.wishlist,
  });
});

//clearWishlist
export const clearWish = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  user.wishlist = [];

  await user.save();

  res.status(201).json({
    message: "Wishlist Cleared",
    status: "success",
    success: true,
    data: null,
  });
});

////getAll Wishlists

export const getAllWish = asyncHandler(async (req: Request, res: Response) => {
  const wishlists = await Product.find();
  res.status(200).json({
    message: "All wishlists fetched successfully",
    success: true,
    status: "success",
    data: wishlists,
  });
});
