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
exports.getAllWish = exports.clearWish = exports.createWish = void 0;
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const product_model_1 = __importDefault(require("../models/product.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
//Creating wishlist
exports.createWish = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { productId } = req.body;
    if (!productId) {
        throw new error_handler_middleware_1.default("ProductId is required", 400);
    }
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.default("User not found", 404);
    }
    const isProductAlreadyExits = user.wishlist.find((wishlistProduct) => wishlistProduct.toString() === product._id.toString());
    if (isProductAlreadyExits) {
        user.wishlist = user.wishlist.filter((wishlistProduct) => wishlistProduct.toString() !== product._id.toString());
    }
    else {
        user.wishlist.push(product._id);
    }
    yield user.save();
    res.status(201).json({
        //ternary operator
        message: `${isProductAlreadyExits ? "Removed from " : "Added to"} wishlist`,
        status: "success",
        success: true,
        data: user.wishlist,
    });
}));
//clearWishlist
exports.clearWish = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.default("User not found", 404);
    }
    user.wishlist = [];
    yield user.save();
    res.status(201).json({
        message: "Wishlist Cleared",
        status: "success",
        success: true,
        data: null,
    });
}));
////getAll Wishlists
exports.getAllWish = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlists = yield product_model_1.default.find();
    res.status(200).json({
        message: "All wishlists fetched successfully",
        success: true,
        status: "success",
        data: wishlists,
    });
}));
