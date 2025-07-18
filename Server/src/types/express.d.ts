import { JWTPayload } from "./global.types";
// src/@types/express/index.d.ts
import * as express from "express";
//this file is created because we are using req. in middlewares adn we can aldo use res. in middlewares

declare global {
  //node js global types
  namespace Express {
    interface Request {
      user: JWTPayload;
    }
  }
}
