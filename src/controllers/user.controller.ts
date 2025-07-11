import { Request, Response } from "express";
import User from "../models/user.model";
import { asyncHandler } from "../utils/async-handler.utils";

import CustomError from "../middlewares/error-handler.middleware";

// // register new user
// export const registerUser = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { full_name, email, password, phone_number } = req.body;

//     const hashedPassword = await hash(password);

//     // check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       throw new CustomError("User already exists with provided email", 400);
//     }

//     const user = await User.create({
//       full_name,
//       email,
//       password: hashedPassword,
//       phone_number,
//     });

//     // sign JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
//       expiresIn: "7d",
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       success: true,
//       data: {
//         user: {
//           _id: user._id,
//           full_name: user.full_name,
//           email: user.email,
//           phone_number: user.phone_number,
//           role: user.role,
//         },
//         token,
//       },
//     });
//   }
// );

// // login user
// export const loginUser = asyncHandler(async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new CustomError("Invalid credentials", 400);
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new CustomError("Invalid credentials", 400);
//   }

//   // sign JWT token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
//     expiresIn: "7d",
//   });

//   res.status(200).json({
//     message: "Login successful",
//     success: true,
//     data: {
//       user: {
//         _id: user._id,
//         full_name: user.full_name,
//         email: user.email,
//         phone_number: user.phone_number,
//         role: user.role,
//       },
//       token,
//     },
//   });
// });

// // get own profile
// export const getProfile = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user._id;

//   const user = await User.findById(userId).select("-password");
//   if (!user) {
//     throw new CustomError("User not found", 404);
//   }

//   res.status(200).json({
//     message: "User profile fetched successfully",
//     success: true,
//     data: user,
//   });
// });

// update profile
export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { full_name, phone_number } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    user.full_name = full_name || user.full_name;
    user.phone_number = phone_number || user.phone_number;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: user,
    });
  }
);

// delete account (user self-delete)
export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new CustomError("User not found", 404);
    }

    res.status(200).json({
      message: "Account deleted successfully",
      success: true,
      data: null,
    });
  }
);
