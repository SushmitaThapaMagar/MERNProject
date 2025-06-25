// auth middleware

import { NextFunction, Request, Response } from "express";
import CustomError from "./error-handler.middleware";
import { decodeJWTToken } from "../utils/jwt.utils";
import User from "../models/user.model";
import { JWTPayloadDecoded } from "../types/global.types";
import { Role } from "../types/global.types";

//middleware export function named : authenticate
export const authenticate = (roles?: Role[]) => {
  //defines asynchronous middleware function:

  //asynchronous use async/wait -- try/catch -- handler
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token;
      // const token  = req.headers['authorization']
      if (!token) {
        throw new CustomError("Unauthorized(token). Access denied", 401);
      }

      // check validity of token
      const decodedData = decodeJWTToken(token) as JWTPayloadDecoded;

      //token retrieve / getting back
      //attempts to retrieve the JWT from cookies (specifically, access_token)
      if (!decodedData) {
        throw new CustomError("Unauthorized(deocdedData). Access denied", 401);
      }

      //Looks for a user in the database whose email matches the decoded JWT data
      const user = await User.findOne({ email: decodedData.email });

      //throws an error indicating unauthorized access
      if (!user) {
        throw new CustomError("Unauthorized(user). Access denied", 401);
      }

      //Checks if the token has expired by comparing the expiration time (exp) to the current time.
      if (decodedData.exp * 1000 < Date.now()) {
        res.clearCookie("access_token", {
          httpOnly: true,
        });
        //If expired, it clears the token cookie and throws an unauthorized error
        throw new CustomError("Unauthorized. Access denied", 401);
      }

      //role based ??
      //If all checks pass, it calls next() to proceed to the next middleware or route handler
      next();

      //Logs the decoded data and the token for debugging purposes.
      console.log(decodedData);

      console.log(token);
      //Catches any errors that occur in the try block and passes them to the next error handling middleware

      if (roles && !roles.includes(user.role)) {
        throw new CustomError("Forbidden. Access denied", 403);
      }
    } catch (err) {
      next(err);
    }
  };
};
