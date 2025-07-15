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
exports.cancelOrder = exports.updateStatus = exports.getOrderById = exports.removeOrder = exports.getAllByUserId = exports.getAllOrders = exports.createOrder = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
const order_model_1 = __importDefault(require("../models/order.model"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const global_types_1 = require("../types/global.types");
const nodemailer_utils_1 = require("../utils/nodemailer.utils");
const html_utils_1 = require("../utils/html.utils");
//create order
exports.createOrder = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: user, email } = req.user;
    const { items } = req.body;
    const orderItems = JSON.parse(items);
    const orderProducts = orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(item.product);
        if (!product) {
            return null;
        }
        return {
            product: product._id,
            quantity: item.quantity,
            totalPrice: product.price * item.quantity,
        };
    }));
    const products = yield Promise.all(orderProducts);
    const filteredItems = products.filter((item) => item !== null);
    const totalAmount = filteredItems
        .reduce((acc, item) => {
        return (acc += item === null || item === void 0 ? void 0 : item.totalPrice);
    }, 0)
        .toFixed(2);
    const order = new order_model_1.default({ user, items: filteredItems, totalAmount });
    const newOrder = yield (yield order.save()).populate("items.product");
    yield (0, nodemailer_utils_1.sendMail)({
        to: email,
        subject: "Order Placed Successfully",
        html: (0, html_utils_1.order_confirmation_html)(newOrder.items, Number(totalAmount)),
    });
    res.status(201).json({
        message: "Order placed successfully",
        success: true,
        status: "success",
        data: newOrder,
    });
}));
//get all orders (only admin)
exports.getAllOrders = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allOrders = yield order_model_1.default.find()
        .sort({ createdAt: -1 })
        .populate("user", "-password")
        .populate("items.product"); //sort({createdAt: -1}) responses in array , it is in ascending and descending orders
    res.status(200).json({
        message: "All Orders Fetched",
        status: "success",
        success: true,
        data: allOrders,
    });
}));
//get all order for users (only user)
exports.getAllByUserId = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const allOrders = yield order_model_1.default.find()
        .sort({ createdAt: -1 })
        .populate("user", "-password")
        .populate("items.product"); //sort({createdAt: -1}) responses in array , it is in ascending and descending orders
    res.status(200).json({
        message: "All Orders Fetched",
        status: "success",
        success: true,
        data: allOrders,
    });
}));
//delete order (admin, user)
exports.removeOrder = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const deletedOrder = yield order_model_1.default.findByIdAndDelete(orderId)
        .populate("user", "-password")
        .populate("items.product");
    if (!deletedOrder) {
        throw new error_handler_middleware_1.default("Order Not Found", 400);
    }
    res.status(200).json({
        message: "Order Deleted Successfully",
        status: "success",
        success: true,
        data: deletedOrder,
    });
}));
//get order by id (user, admin)
exports.getOrderById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield order_model_1.default.findById(orderId)
        .populate("user", "-password")
        .populate("items.product");
    res.status(200).json({
        message: "Order Fetched Successfully",
        status: "success",
        success: true,
        data: order,
    });
}));
// update order status
exports.updateStatus = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        throw new error_handler_middleware_1.default("Status is Required", 400);
    }
    const order = yield order_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
        throw new error_handler_middleware_1.default("Order Not Found", 400);
    }
    res.status(200).json({
        message: "Order status updated Successfully",
        status: "success",
        success: true,
        data: order,
    });
}));
//user cancel order(cancelled order by user)
exports.cancelOrder = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // get order id from client
    const { id } = req.params;
    //get user id from req.user._id
    const userId = req.user._id;
    //find order by id
    const order = yield order_model_1.default.findById(id)
        .populate("user", "-password")
        .populate("items.product");
    if (!order) {
        throw new error_handler_middleware_1.default("Order Not Found", 400);
    }
    //order .user === req.user._id
    if (((_a = order.user) === null || _a === void 0 ? void 0 : _a.toString()) !== userId.toString()) {
        throw new error_handler_middleware_1.default("You cannot cancel this order", 403);
    }
    //
    order.status = global_types_1.OrderStatus.CANCELED;
    yield order.save();
    res.status(200).json({
        message: "Order canceled Successfully",
        status: "success",
        success: true,
        data: order,
    });
}));
