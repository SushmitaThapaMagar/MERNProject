import { JWTPayload } from "./global.types";

//this file is created because we are using req. in middlewares adn we can aldo use res. in middlewares

declare global {
  //node js global types
  namespace Express {
    interface Request {
      user: JWTPayload;
    }
  }
}
