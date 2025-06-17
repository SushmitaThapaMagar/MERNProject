import { Request, Response, NextFunction, response } from "express";
import User from "../modules/user.model";
import { compare, hash } from "../utils/bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //res.body
    console.log(req.body);

    const { email, full_name, password, phone_number } = req.body; //extracts email, full_name, password, and phone_number from the req.body object. req.body contains the data sent by the client

    if (!password) {
      throw new Error("Password is Required! ");
    }

    //hashing user password

    const hashedPassword = await hash(password);

    //creating user
    const user = User.create({
      email,
      full_name,
      password: hashedPassword,
      phone_number,
    });
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

const login = async (req: Request, res: Response) => {
  try {
    //body (email, password)
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Email is required!");
    }

    if (!password) {
      throw new Error("Password is required!");
    }

    //find user by email
    const user = await User.findOne({ email });

    //if(!user)=> error
    if (!user) {
      throw new Error("Email or Password Not Found");
    }

    //compare password
    const isPasswordMatched = await compare(password, user.password);

    //if(!match)=>error

    if (!isPasswordMatched) {
      throw new Error("Email or Password does not match");
    }

    //login success
    res.status(200).json({
      message: "Login Success",
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
