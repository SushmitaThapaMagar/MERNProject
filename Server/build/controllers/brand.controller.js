"use strict";
//brand APIS
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
exports.deleteBrand = exports.updateBrand = exports.getBrandById = exports.getAllBrands = exports.createBrand = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
//create (post method) ==============
exports.createBrand = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    console.log(req.body);
    // Check if values are provided
    if (!name || !description) {
        throw new error_handler_middleware_1.default("Name and description are required", 400);
    }
    const brandExists = yield brand_model_1.default.findOne({ name });
    if (brandExists) {
        throw new error_handler_middleware_1.default("Brand already exists", 400);
    }
    // Create the brand
    const brand = yield brand_model_1.default.create({ name, description });
    res.status(201).json({
        message: "Brand created successfully",
        success: true,
        data: brand,
    });
}));
//getAll brands (get method)  ==============
exports.getAllBrands = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const filter = {}; // create object or filter is an object where you can filter anything you like
    console.log(query);
    //query
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                descrition: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    const brands = yield brand_model_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({
        message: "Brands fetched successfully",
        success: true,
        data: brands,
    });
}));
//getby id (get method) ==============
exports.getBrandById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brand_model_1.default.findById(req.params.id);
    if (!brand) {
        throw new error_handler_middleware_1.default("Brand not found", 404);
    }
    res.status(200).json({
        message: "Brand fetched successfully",
        success: true,
        data: brand,
    });
}));
//update (put method)  ==============
exports.updateBrand = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    // //for logo
    // const { logo } = req.files as {
    //   logo: Express.Multer.File[];
    // };
    const updatedbrand = yield brand_model_1.default.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!updatedbrand) {
        throw new error_handler_middleware_1.default("Brand not found", 404);
    }
    // //update logo
    // if (logo) {
    //   if (updatedbrand.logo) {
    //   }
    // }
    res.status(200).json({
        message: "Brand updated successfully",
        success: true,
        data: updatedbrand,
    });
}));
//delete brand (delete)  ==============
exports.deleteBrand = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBrand = yield brand_model_1.default.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
        throw new error_handler_middleware_1.default("Brand not found", 404);
    }
    res.status(200).json({
        message: "Brand deleted successfully",
        success: true,
        data: deletedBrand,
    });
}));
