"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//brand name
// brand controller ->CRUD
// routes from brand
//use brand route on server.ts
// update product model -> product -> add brand field =>ref .brand collection/document
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    // logo: {
    //   path: {
    //     type: String,
    //     required: true,
    //   },
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    // },
}, { timestamps: true });
//create mongoose schema
const Brand = mongoose_1.default.model("brand", brandSchema);
//create mongoose model form brand
exports.default = Brand;
