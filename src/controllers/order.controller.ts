import mongoose from "mongoose";
import Product from "../models/product.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";
import Order from "../models/order.model";
import CustomError from "../middlewares/error-handler.middleware";
import { OrderStatus } from "../types/global.types";
import { sendMail } from "../utils/nodemailer.utils";
import { order_confirmation_html } from "../utils/html.utils";

//create order
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { _id: user, email } = req.user;
  const { items } = req.body;

  const orderItems: { product: string; quantity: number }[] = JSON.parse(items);

  const orderProducts = orderItems.map(async (item) => {
    const product = await Product.findById(item.product);

    if (!product) {
      return null;
    }

    return {
      product: product._id,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity,
    };
  });

  const products = await Promise.all(orderProducts);

  const filteredItems = products.filter((item) => item !== null);

  const totalAmount = filteredItems
    .reduce((acc, item) => {
      return (acc += item?.totalPrice);
    }, 0)
    .toFixed(2);

  const order = new Order({ user, items: filteredItems, totalAmount });

  const newOrder = await (await order.save()).populate("items.product");

  await sendMail({
    to: email,
    subject: "Order Placed Successfully",
    html: order_confirmation_html(newOrder.items, Number(totalAmount)),
  });

  res.status(201).json({
    message: "Order placed successfully",
    success: true,
    status: "success",
    data: newOrder,
  });
});

//get all orders (only admin)
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const allOrders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "-password")
      .populate("items.product"); //sort({createdAt: -1}) responses in array , it is in ascending and descending orders

    res.status(200).json({
      message: "All Orders Fetched",
      status: "success",
      success: true,
      data: allOrders,
    });
  }
);

//get all order for users (only user)
export const getAllByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user._id;
    const allOrders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "-password")
      .populate("items.product"); //sort({createdAt: -1}) responses in array , it is in ascending and descending orders

    res.status(200).json({
      message: "All Orders Fetched",
      status: "success",
      success: true,
      data: allOrders,
    });
  }
);

//delete order (admin, user)
export const removeOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const deletedOrder = await Order.findByIdAndDelete(orderId)
    .populate("user", "-password")
    .populate("items.product");
  if (!deletedOrder) {
    throw new CustomError("Order Not Found", 400);
  }
  res.status(200).json({
    message: "Order Deleted Successfully",
    status: "success",
    success: true,
    data: deletedOrder,
  });
});

//get order by id (user, admin)

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate("user", "-password")
      .populate("items.product");

    res.status(200).json({
      message: "Order Fetched Successfully",
      status: "success",
      success: true,
      data: order,
    });
  }
);

// update order status
export const updateStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      throw new CustomError("Status is Required", 400);
    }
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      throw new CustomError("Order Not Found", 400);
    }
    res.status(200).json({
      message: "Order status updated Successfully",
      status: "success",
      success: true,
      data: order,
    });
  }
);

//user cancel order(cancelled order by user)

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  // get order id from client
  const { id } = req.params;
  //get user id from req.user._id
  const userId = req.user._id;
  //find order by id
  const order = await Order.findById(id)
    .populate("user", "-password")
    .populate("items.product");
  if (!order) {
    throw new CustomError("Order Not Found", 400);
  }

  //order .user === req.user._id
  if (order.user?.toString() !== userId.toString()) {
    throw new CustomError("You cannot cancel this order", 403);
  }
  //
  order.status = OrderStatus.CANCELED;
  await order.save();

  res.status(200).json({
    message: "Order canceled Successfully",
    status: "success",
    success: true,
    data: order,
  });
});
