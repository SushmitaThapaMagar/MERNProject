"use strict";
// auth middleware
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
exports.authenticate = void 0;
const error_handler_middleware_1 = __importDefault(require("./error-handler.middleware"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
//middleware export function named : authenticate
const authenticate = (roles) => {
    //defines asynchronous middleware function:
    //asynchronous use async/wait -- try/catch -- handler
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.cookies.access_token;
            // const token  = req.headers['authorization']
            if (!token) {
                throw new error_handler_middleware_1.default("Unauthorized(token). Access denied", 401);
            }
            // check validity of token
            const decodedData = (0, jwt_utils_1.decodeJWTToken)(token);
            //token retrieve / getting back
            //attempts to retrieve the JWT from cookies (specifically, access_token)
            if (!decodedData) {
                throw new error_handler_middleware_1.default("Unauthorized(deocdedData). Access denied", 401);
            }
            //Looks for a user in the database whose email matches the decoded JWT data
            const user = yield user_model_1.default.findOne({ email: decodedData.email });
            //throws an error indicating unauthorized access
            if (!user) {
                throw new error_handler_middleware_1.default("Unauthorized(user). Access denied", 401);
            }
            //Checks if the token has expired by comparing the expiration time (exp) to the current time.
            if (decodedData.exp * 1000 < Date.now()) {
                res.clearCookie("access_token", {
                    httpOnly: true,
                });
                //If expired, it clears the token cookie and throws an unauthorized error
                throw new error_handler_middleware_1.default("Unauthorized. Access denied", 401);
            }
            //role based ??
            //If all checks pass, it calls next() to proceed to the next middleware or route handler
            // next();
            //Logs the decoded data and the token for debugging purposes.
            console.log(decodedData);
            console.log(token);
            //Catches any errors that occur in the try block and passes them to the next error handling middleware
            if (roles && !roles.includes(user.role)) {
                throw new error_handler_middleware_1.default("Forbidden. Access denied", 403);
            }
            // cart needed the user details to add to cart that's we made req.user
            req.user = {
                _id: user._id,
                role: user.role,
                email: user.email,
                full_name: user.full_name,
            };
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.authenticate = authenticate;
