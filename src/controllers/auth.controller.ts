import { Request, Response, NextFunction } from "express";
import User from "../modules/user.model";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //res.body
    console.log(req.body);
    const { email, full_name, password, phone_number } = req.body; //extracts email, full_name, password, and phone_number from the req.body object. req.body contains the data sent by the client

    //creating user
    const user = User.create({ email, full_name, password, phone_number });
    //throw error
    if (!user) {
      throw new Error("Registration Failed! Try again later! ");
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
    res.status(500).json({
      message: error?.message ?? "internet Server Error",
      success: false,
      status: "fail",
    });
  }
};
