"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const global_types_1 = require("../types/global.types");
const orderSchema = new mongoose_1.default.Schema({
    //user is set in this
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "User is required"],
        ref: "user",
    },
    orderId: {
        type: String,
        required: true,
        default: `ORD-${(0, uuid_1.v4)().split("-")[0]}`,
    },
    items: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "product",
                required: [true, "Product is required!"],
            },
            quantity: {
                type: Number,
                required: [true, "Product quantity is Required!"],
            },
        },
    ],
    status: {
        type: String,
        enum: Object.values(global_types_1.OrderStatus),
        default: global_types_1.OrderStatus.PENDING,
    },
    totalAmount: {
        type: Number,
        required: [true, "Total Amount is Required!"],
    },
}, { timestamps: true } // Automatically add createdAt and updatedAt fields
);
const Order = mongoose_1.default.model("order", orderSchema);
exports.default = Order;
