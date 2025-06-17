import mongoose from "mongoose";
import { Role } from "../types/global.types";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full_name is requires"],
      trim: true, //remove the uneccessary space in full name
    },
    email: {
      required: [true, "Email is requires"],
      type: String,
      unique: [true, "User already exist with provided email!"],
    },
    password: {
      required: [true, "Password is requires"],
      min: [, "Password must be at least 6 char long"],
      type: String,
    },
    phone_number: {
      type: String,
    },
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
