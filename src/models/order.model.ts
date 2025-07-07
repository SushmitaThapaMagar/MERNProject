import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Product from "./product.model";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "user",
    },
    orderId: {
      type: String,
      required: true,
      default: `ORD-${uuidv4().split("-")[0]}`,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: [true, "Product is required!"],
        },
        quantity: {
          type: Number,
          required: [true, "Product quantity is Required!"],
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Canceled", "Completed"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      required: [true, "Total Amount is Required!"],
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Order = mongoose.model("order", orderSchema);
export default Order;
