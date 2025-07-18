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
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const category_model_1 = __importDefault(require("../models/category.model"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
//post category
exports.create = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const category = yield category_model_1.default.create({ name, description });
    if (!category) {
        throw new error_handler_middleware_1.default("Some went wrong", 500);
    }
    res.status(201).json({
        message: "Category Created.",
        success: true,
        status: "success",
        data: category,
    });
}));
//get all categories
exports.getAll = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const filter = {}; // create object or filter is an object where you can filter anything you like
    console.log(query);
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
    const categories = yield category_model_1.default.find(filter);
    res.status(200).json({
        message: "All category fetched",
        success: true,
        status: "success",
        data: categories,
    });
}));
//getbyId categories
exports.getById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get id from req.params
    const { id } = req.params; //req.params refers to an object that contains route parameters
    //get category bi given id
    const category = yield category_model_1.default.findById(id);
    if (!category) {
        throw new error_handler_middleware_1.default("Category not found", 400);
    }
    res.status(200).json({
        message: ` Category by id ${id} fetched`,
        success: true,
        status: "success",
        data: category,
    });
}));
//update category
exports.update = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedcategory = yield category_model_1.default.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedcategory) {
        throw new error_handler_middleware_1.default("Updated Category Not Found", 400);
    }
    res.status(200).json({
        message: "Category updated successfully",
        success: true,
        status: "success",
        data: updatedcategory,
    });
}));
//delete categories
exports.remove = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletecategory = yield category_model_1.default.findByIdAndDelete(id, { new: true });
    if (!deletecategory) {
        throw new error_handler_middleware_1.default("Deleted Category Not Found", 400);
    }
    res.status(200).json({
        message: "Category deleted successfully!",
        success: true,
        status: "success",
        data: null,
    });
}));
