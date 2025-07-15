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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByCategory = exports.getFeaturedProducts = exports.removeProduct = exports.updateProducts = exports.getByIdProduct = exports.getAllProducts = exports.createProduct = void 0;
const async_handler_utils_1 = require("../utils/async-handler.utils");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const cloudinary_config_1 = require("../cloudinary.config");
const pagination_utils_1 = require("../utils/pagination.utils");
// name
// price
// description
// stock
// brand
// isFeatured
//post products  ==============
exports.createProduct = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { category: categoryId } = _a, data = __rest(_a, ["category"]);
    const { coverImage, images } = req.files;
    if (!coverImage || coverImage.length === 0) {
        throw new error_handler_middleware_1.default("Cover image is Required", 404);
    }
    const category = yield category_model_1.default.findById(categoryId);
    if (!category) {
        throw new error_handler_middleware_1.default("Category is Required", 404);
    }
    const product = new product_model_1.default(data);
    product.category = category._id;
    //add product cover image
    product.coverImage = {
        path: coverImage[0].path,
        public_id: coverImage[0].filename,
    };
    //add product images
    if (images && images.length > 0) {
        const imagePath = images.map((image) => ({
            path: image.path,
            public_id: image.filename,
        }));
        // product.images = imagePath as any;
        product.set("images", imagePath);
    }
    yield product.save();
    if (!product) {
        throw new error_handler_middleware_1.default("Something went wrong", 500);
    }
    res.status(201).json({
        //201 success
        message: "Product Created Successfully.",
        success: true,
        status: "success",
        data: product,
    });
}));
//Get all products  ==============
exports.getAllProducts = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:port/path?......query
    var _a, _b;
    const { query, category, minPrice, maxPrice, page, limit } = req.query;
    const filter = {}; // create object or filter is an object where you can filter anything you like
    //pagination
    const perPage = (_a = parseInt(limit)) !== null && _a !== void 0 ? _a : 10;
    const currentPage = (_b = parseInt(page)) !== null && _b !== void 0 ? _b : 20;
    //calculate skip
    const skip = (currentPage - 1) * perPage;
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
    //for filter by category
    if (category) {
        filter.category = category;
    }
    if (minPrice || maxPrice) {
        if (minPrice && maxPrice) {
            filter.price = {
                $lte: Number(maxPrice),
                $gte: Number(minPrice),
            };
        }
        if (minPrice) {
            filter.price = {
                $gte: Number(minPrice),
            };
        }
        if (maxPrice) {
            filter.price = {
                $lte: Number(minPrice),
            };
        }
    }
    const products = yield product_model_1.default.find(filter)
        .limit(perPage) //limitation of data is perpage
        .skip(skip) //skip the data as skip
        .sort({ createdAt: -1 }) //sorted from the most recently created to the oldest.
        .populate("category"); //populate("category") means it display the data of category full data having the same ref: name from model of products
    // to count the number of documents in a MongoDB collection
    const totalData = yield product_model_1.default.countDocuments(filter);
    const pagination = (0, pagination_utils_1.getPagination)(totalData, perPage, currentPage);
    res.status(200).json({
        message: "All Products fetched successfully",
        success: true,
        status: "success",
        data: { products, pagination },
    });
}));
//getbyId products  ==============
exports.getByIdProduct = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get id from req.params
    const { id } = req.params; //req.params refers to an object that contains route parameters
    //get category by given id
    const product = yield product_model_1.default.findOne({ _id: id }).populate("category");
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    res.status(200).json({
        message: ` Product by id ${id} fetched`,
        success: true,
        status: "success",
        data: product,
    });
}));
// 1. json => name, category, price ..
// 2. images [5] [2 old => delete] [add 2 => new images]
//update products ==============
exports.updateProducts = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { coverImage, images } = req.files;
    const { deletedImage, name, description, stock, brand, category, isFeatured, price, } = req.body;
    if (category) {
        const productCategory = yield category_model_1.default.findById(category);
        if (!productCategory) {
            throw new error_handler_middleware_1.default("Category not found", 404);
        }
    }
    const updatedproduct = yield product_model_1.default.findByIdAndUpdate(id, {
        name,
        description,
        stock,
        brand,
        category,
        isFeatured,
        price,
    }, { new: true, runValidators: true } //return the document as it was before the update
    );
    if (!updatedproduct) {
        throw new error_handler_middleware_1.default("Updated Product Not Found", 404);
    }
    //update cover image
    if (coverImage) {
        if (updatedproduct.coverImage) {
            yield (0, cloudinary_config_1.removeImages)([updatedproduct.coverImage.public_id]);
        }
        updatedproduct.coverImage = {
            path: coverImage[0].path,
            public_id: coverImage[0].filename,
        };
    }
    //images update
    if (Array.isArray(deletedImage) && deletedImage.length > 0) {
        yield (0, cloudinary_config_1.removeImages)(deletedImage);
        if (updatedproduct.images) {
            updatedproduct.images =
                (_a = updatedproduct.images.filter((img) => !deletedImage.includes(img.public_id))) !== null && _a !== void 0 ? _a : [];
        }
    }
    //update images
    if (images && images.length > 0) {
        const newImages = images.map((img) => ({
            path: img.path,
            public_id: img.filename,
        }));
        updatedproduct.set("images", [...updatedproduct.images, ...newImages]); // ... spread operator:  it spread makes the product.image with new Array
    }
    yield updatedproduct.save();
    res.status(200).json({
        message: "Product updated successfully",
        success: true,
        status: "success",
        data: updatedproduct,
    });
}));
//delete products  ==============
exports.removeProduct = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //1. get product
    const deleteproduct = yield product_model_1.default.findById(id);
    if (!deleteproduct) {
        throw new error_handler_middleware_1.default("Deleted product Not Found", 404);
    }
    // 2. products images => delete
    //for coverImage
    if (deleteproduct.coverImage) {
        yield (0, cloudinary_config_1.removeImages)([deleteproduct.coverImage.public_id]);
    }
    //for images
    if (deleteproduct.images && deleteproduct.images.length > 0) {
        const imageIds = deleteproduct.images.map((image) => image.public_id);
        yield (0, cloudinary_config_1.removeImages)(imageIds);
    }
    // 3. delete product
    yield deleteproduct.deleteOne();
    res.status(200).json({
        message: "Product deleted successfully!",
        success: true,
        status: "success",
        data: null,
    });
}));
//get all featured products
exports.getFeaturedProducts = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const featured = yield product_model_1.default.find({ isFeatured: true }).populate("category");
    res.status(200).json({
        status: "success",
        success: true,
        message: "Featured Products Fetched Successfully",
        data: featured,
    });
}));
//get by category id
exports.getByCategory = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const categoryproduct = yield product_model_1.default.find({
        category: categoryId,
    }).populate("category");
    res.status(200).json({
        status: "success",
        success: true,
        message: "Producs by Category Fetched Successfully",
        data: categoryproduct,
    });
}));
