import mongoose from "mongoose";
import { Role } from "../types/global.types";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First_name is required"],
      trim: true, //remove the uneccessary space in full name
    },
    last_name: {
      type: String,
      required: [true, "Last_name is required"],
      trim: true, //remove the uneccessary space in full name
    },
    email: {
      required: [true, "Email is required"],
      type: String,
      unique: [true, "User already exist with provided email!"],
    },
    password: {
      required: [true, "Password is required"],
      min: [, "Password must be at least 6 char long"],
      type: String,
    },
    phone_number: {
      type: String,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const User = mongoose.model("user", userSchema);
export default User;
