"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is Required"],
    },
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "brand",
        required: [true, "Brand is Required"],
        trim: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId, //returns in mongoose db idea
        ref: "category", //this is the name of the category model that is in categroySchema
        required: [true, "Category is Required"],
    },
    description: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, "Stock is Required"],
    },
    coverImage: {
        path: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
    },
    images: [
        {
            path: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },
    ],
    isFeatured: {
        //isFeatured is used for the features product e.g. NewArrival -- we use Feature Product as the display product or upcoming products
        type: Boolean,
        default: false,
        required: [true, "Featured is Required"],
    },
}, { timestamps: true });
//creating mongoose model
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
