import CustomError from "../middlewares/error-handler.middleware";
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";

export const createCart = asyncHandler(async (req: Request, res: Response) => {
  // 1. first time create
  // 2. update/add new product
  //

  const { productId, quantity, user } = req.body;
  let cart;

  //checked product id
  if (!productId) {
    throw new CustomError("ProductId is Required", 400);
  }
  cart = await Cart.findOne({ user });

  if (!cart) {
    cart = new Cart({ user, items: [] });
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("Product not Found", 400);
  }

  // check if the product already exists in cart or not - check if the same product is in same cart or not

  const productAlreadyExists = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (productAlreadyExists) {
    productAlreadyExists.quantity = parseInt(quantity);
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  res.status(201).json({
    message: "Cart Created",
    success: true,
    status: "success",
    data: cart,
  });
});
