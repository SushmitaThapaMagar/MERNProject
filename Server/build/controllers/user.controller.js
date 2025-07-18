"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
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
exports.updateProfile = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { full_name, phone_number } = req.body;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.default("User not found", 404);
    }
    user.full_name = full_name || user.full_name;
    user.phone_number = phone_number || user.phone_number;
    yield user.save();
    res.status(200).json({
        message: "Profile updated successfully",
        success: true,
        data: user,
    });
}));
// delete account (user self-delete)
exports.deleteAccount = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const deletedUser = yield user_model_1.default.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new error_handler_middleware_1.default("User not found", 404);
    }
    res.status(200).json({
        message: "Account deleted successfully",
        success: true,
        data: null,
    });
}));
