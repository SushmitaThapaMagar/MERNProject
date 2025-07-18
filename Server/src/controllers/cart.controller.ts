import CustomError from "../middlewares/error-handler.middleware";
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";

export const createCart = asyncHandler(async (req: Request, res: Response) => {
  // 1. first time create
  // 2. update/add new product
  //

  const { productId, quantity } = req.body;

  const user = req.user._id; //user id, role, full_name, email can be used by this variable
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

  //to check if same product already exists on cart
  const productAlreadyExists = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (productAlreadyExists) {
    //if product already exists only update new quantity for that product
    productAlreadyExists.quantity = parseInt(quantity);
  } else {
    //else add new item on cart
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

//clear cart

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user._id;

  const cart = await Cart.findOneAndUpdate(
    { user },
    { items: [] },
    { new: true }
  );

  if (!cart) {
    throw new CustomError("Cart Not Found", 400);
  }

  res.status(200).json({
    status: "success",
    success: true,
    message: "Cart Cleared Successfully",
    data: cart,
  });
});

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user._id;
  const cart = await Cart.findOne({ user })
    .populate("user", "-password")
    .populate("items.product");

  if (!cart) {
    throw new CustomError("Cart Is Not Created yet", 400);
  }
  res.status(200).json({
    status: "Cart Fetched",
    success: true,
    message: "success",
    data: cart,
  });
});
