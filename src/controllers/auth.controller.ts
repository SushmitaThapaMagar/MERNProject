import { Request, Response, NextFunction, response } from "express";
import User from "../modules/user.model";
import { compare, hash } from "../utils/bcrypt";
import CustomError from "../middlewares/error-handler.middleware";
import { asyncHandler } from "../utils/async-handler.utils";
import { generateJWTToken } from "../utils/jwt.utils";

//Register success====================

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, full_name, password, phone_number } = req.body; //extracts email, full_name, password, and phone_number from the req.body object. req.body contains the data sent by the client

      if (!password) {
        throw new CustomError("Password is Required.", 400);
      }

      //hashing user password

      const hashedPassword = await hash(password);

      //creating user
      const user = await User.create({
        email,
        full_name,
        password: hashedPassword,
        phone_number,
      });
      //throw error
      if (!user) {
        throw new CustomError("Registration Failed. Try Again later.", 500);
      }

      //success response
      res.status(201).json({
        //in create 201 status
        message: "User Registered",
        success: true,
        status: "success",
        data: user,
      });
    } catch (error: any) {
      // res.status(500).json({
      //   message: error?.message ?? "internet Server Error",
      //   success: false,
      //   status: "fail",
      // });
      next(error);
    }
  }
);

// Login success==========

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // body (email,password)
      const { email, password } = req.body;

      if (!email) {
        throw new CustomError("Email is Required", 400);
      }

      if (!password) {
        throw new CustomError("Password is Required", 400);
      }

      // find user by email
      const user = await User.findOne({ email });

      // if !user => error
      if (!user) {
        throw new CustomError("Email or password does not match", 404);
      }

      // compare password
      const isPasswordMatched = await compare(password, user.password);

      // !match -> error
      if (!isPasswordMatched) {
        throw new CustomError("Email or password does not match", 400);
      }

      //jwt token
      const payload = {
        full_name: user.full_name,
        _id: user._id,
        role: user.role,
        email: user.email,
      };

      const token = generateJWTToken(payload);
      //category
      //products

      // login success
      res.status(200).json({
        message: "Login success",
        success: true,
        status: "success",
        data: {
          user,
          access_token: token,
        },
      });
    } catch (error: any) {
      // console.log(error);

      // res.status(500).json({
      //   message: error?.message ?? "Internal server error",
      //   success: false,
      //   status: "fail",
      // });

      next(error);
    }
  }
);
