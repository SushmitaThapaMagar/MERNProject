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
exports.getCart = exports.clearCart = exports.createCart = void 0;
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const cart_model_1 = __importDefault(require("../models/cart.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
exports.createCart = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. first time create
    // 2. update/add new product
    //
    const { productId, quantity } = req.body;
    const user = req.user._id; //user id, role, full_name, email can be used by this variable
    let cart;
    //checked product id
    if (!productId) {
        throw new error_handler_middleware_1.default("ProductId is Required", 400);
    }
    cart = yield cart_model_1.default.findOne({ user });
    if (!cart) {
        cart = new cart_model_1.default({ user, items: [] });
    }
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new error_handler_middleware_1.default("Product not Found", 400);
    }
    //to check if same product already exists on cart
    const productAlreadyExists = cart.items.find((item) => item.product.toString() === productId);
    if (productAlreadyExists) {
        //if product already exists only update new quantity for that product
        productAlreadyExists.quantity = parseInt(quantity);
    }
    else {
        //else add new item on cart
        cart.items.push({ product: productId, quantity });
    }
    yield cart.save();
    res.status(201).json({
        message: "Cart Created",
        success: true,
        status: "success",
        data: cart,
    });
}));
//clear cart
exports.clearCart = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const cart = yield cart_model_1.default.findOneAndUpdate({ user }, { items: [] }, { new: true });
    if (!cart) {
        throw new error_handler_middleware_1.default("Cart Not Found", 400);
    }
    res.status(200).json({
        status: "success",
        success: true,
        message: "Cart Cleared Successfully",
        data: cart,
    });
}));
exports.getCart = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const cart = yield cart_model_1.default.findOne({ user })
        .populate("user", "-password")
        .populate("items.product");
    if (!cart) {
        throw new error_handler_middleware_1.default("Cart Is Not Created yet", 400);
    }
    res.status(200).json({
        status: "Cart Fetched",
        success: true,
        message: "success",
        data: cart,
    });
}));
