"use strict";
//root file
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const db_connect_1 = require("./config/db-connect");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const error_handler_middleware_1 = __importStar(require("./middlewares/error-handler.middleware"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const wishlist_route_1 = __importDefault(require("./routes/wishlist.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const brand_route_1 = __importDefault(require("./routes/brand.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const DB_URI = (_a = process.env.DB_URI) !== null && _a !== void 0 ? _a : "";
//connecing database
(0, db_connect_1.connectDb)(DB_URI);
//using middlewares
//extended : true is used for object is the obj is nested
app.use(express_1.default.urlencoded({ extended: true })); //this let you recover the undefined when we post api
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
//parse cooke
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});
//using routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/category", category_route_1.default);
app.use("/api/product", product_route_1.default);
app.use("/api/cart", cart_route_1.default);
app.use("/api/wishlist", wishlist_route_1.default);
app.use("/api/order", order_route_1.default);
app.use("/api/brand", brand_route_1.default);
app.use("/api/user", user_route_1.default);
app.all("/{*spalt}", (req, res, next) => {
    const message = `Can not ${req.method} on ${req.url}`;
    const error = new error_handler_middleware_1.default(message, 404);
    next(error);
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
app.use(error_handler_middleware_1.errorHandler);
